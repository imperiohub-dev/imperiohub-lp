# @imperiohub/lp-templates

Paquete centralizado de templates para landing pages del ecosistema ImperioHub SaaS.

## Problema que Resuelve

Anteriormente, 3 repositorios (`saas-back`, `saas-admin`, `saas-cliente`) duplicaban la lógica de templates:
- ❌ Desincronización de tipos entre repos
- ❌ Dificultad para mantener consistencia
- ❌ Cambios en un template requieren tocar 3 repos

**Solución**: Un solo paquete NPM que centraliza:
- ✅ Schemas de templates (estructura de datos)
- ✅ Tipos TypeScript (type safety compartido)
- ✅ Validadores Zod (validación runtime)
- ✅ Componentes React (diseño de las landing pages)

## Instalación

```bash
npm install @imperiohub/lp-templates zod
```

**Peer Dependencies**:
- `react` >= 18.0.0 (solo si usas componentes)
- `@prisma/client` >= 5.0.0 (solo si usas el generator)

## Arquitectura del Sistema

### Backend (`saas-back`)
Consume: Schemas + Validadores + Generator

```typescript
import { PrismaClient } from '@prisma/client';
import { allTemplates, initializeTemplates } from '@imperiohub/lp-templates/generator';
import { validateContent } from '@imperiohub/lp-templates';

const prisma = new PrismaClient();

// En seeds: Insertar todos los templates en la DB
await initializeTemplates(allTemplates, prisma);

// Al guardar una landing page: Validar el content
const result = validateContent(userContent, menuTemplate);
```

### Admin (`saas-admin`)
Consume: Schemas (para generar formularios dinámicos)

```typescript
import { menuTemplate, type MenuTemplateContent } from '@imperiohub/lp-templates';

// Listar templates disponibles
const templates = await fetch('/api/templates');

// Generar formulario dinámico basado en schema
function DynamicForm({ template }) {
  return (
    <>
      {template.schema.fields.map(field => (
        <FormField key={field.name} field={field} />
      ))}
    </>
  );
}
```

### Cliente (`saas-cliente`)
Consume: Componentes React (para renderizar landing pages)

```typescript
// 1. Importar el CSS (una sola vez en tu app)
import '@imperiohub/lp-templates/dist/lp-templates.css';

// 2. Importar el TemplateRenderer
import { TemplateRenderer } from '@imperiohub/lp-templates';

// Recibe de la API: { templateSlug, content }
function LandingPage({ data }) {
  return (
    <TemplateRenderer
      templateSlug={data.templateSlug}
      content={data.content}
    />
  );
}
```

**Nota**: Los estilos CSS vienen incluidos en el paquete. Solo necesitas importar el archivo CSS una vez en tu aplicación (generalmente en el archivo principal como `_app.tsx` o `main.tsx`).

## Estructura del Paquete

```
src/
├── schemas/              # Definiciones de templates
│   ├── types.ts          # Tipos base (Zod schemas)
│   ├── validators/       # Validadores con Zod
│   └── templates/        # Templates individuales (menu, hero, etc)
│
├── components/           # Componentes React para renderizar
│   └── MenuTemplate.tsx
│
├── renderer/             # Lógica de renderizado
│   └── TemplateRenderer.tsx  # Mapea slug → componente
│
├── generator/            # Utilidades para backend
│   └── index.ts          # createLandingPageTemplate, initializeTemplates
│
└── examples/             # Ejemplos de contenido
    └── menu-example.ts
```

## Exports del Paquete

### Export Principal (`@imperiohub/lp-templates`)
```typescript
// Schemas y tipos
export * from './schemas';      // LandingPageTemplate, SchemaField, etc
export * from './components';   // MenuTemplate, etc
export * from './renderer';     // TemplateRenderer
export * from './examples';     // menuExample
```

### Export de Schemas (`@imperiohub/lp-templates/schemas`)
```typescript
import {
  menuTemplate,
  allTemplates,
  type MenuTemplateContent,
  validateTemplate,
  validateContent
} from '@imperiohub/lp-templates/schemas';
```

### Export de Componentes (`@imperiohub/lp-templates/components`)
```typescript
import { MenuTemplate, TemplateRenderer } from '@imperiohub/lp-templates/components';
```

### Export de Generator (`@imperiohub/lp-templates/generator`)
```typescript
import {
  createLandingPageTemplate,
  initializeTemplates
} from '@imperiohub/lp-templates/generator';
```

## Crear un Nuevo Template

### 1. Definir el Template

```typescript
// src/schemas/templates/hero.ts
import type { LandingPageTemplate } from '../types';

export const heroTemplate: LandingPageTemplate = {
  name: 'Hero Simple',
  slug: 'hero-simple',
  schema: {
    fields: [
      {
        name: 'title',
        label: 'Título principal',
        type: 'string',
        required: true,
      },
      {
        name: 'subtitle',
        label: 'Subtítulo',
        type: 'string',
        required: false,
      },
      {
        name: 'ctaButtons',
        label: 'Botones de acción',
        type: 'array_object',
        required: true,
        objectFields: [
          {
            name: 'text',
            label: 'Texto del botón',
            type: 'string',
            required: true,
          },
          {
            name: 'href',
            label: 'URL',
            type: 'string',
            required: true,
          },
        ],
      },
    ],
  },
};

// Tipos TypeScript para el content
export interface HeroTemplateContent {
  title: string;
  subtitle?: string;
  ctaButtons: { text: string; href: string }[];
}
```

### 2. Crear el Componente React

```typescript
// src/components/HeroTemplate.tsx
import type { HeroTemplateContent } from '../schemas/templates/hero';

export interface HeroTemplateProps {
  content: HeroTemplateContent;
}

export function HeroTemplate({ content }: HeroTemplateProps) {
  return (
    <div>
      <h1>{content.title}</h1>
      {content.subtitle && <p>{content.subtitle}</p>}
      <div>
        {content.ctaButtons.map((btn, idx) => (
          <a key={idx} href={btn.href}>{btn.text}</a>
        ))}
      </div>
    </div>
  );
}
```

### 3. Registrar en `allTemplates`

```typescript
// src/schemas/templates/index.ts
export * from './menu';
export * from './hero'; // Agregar aquí

import { menuTemplate } from './menu';
import { heroTemplate } from './hero'; // Importar aquí

export const allTemplates = [
  menuTemplate,
  heroTemplate, // Agregar aquí
];
```

### 4. Registrar en `TemplateRenderer`

```typescript
// src/renderer/TemplateRenderer.tsx
import { HeroTemplate } from '../components/HeroTemplate';

const TEMPLATE_COMPONENTS = {
  menu: MenuTemplate,
  'hero-simple': HeroTemplate, // Agregar aquí (usar el slug)
} as const;
```

### 5. Crear Ejemplo de Contenido

```typescript
// src/examples/hero-example.ts
export const heroExample: HeroTemplateContent = {
  title: '¡Bienvenido a nuestra plataforma!',
  subtitle: 'La mejor solución para tu negocio',
  ctaButtons: [
    { text: 'Empezar ahora', href: '/signup' },
    { text: 'Ver demo', href: '/demo' },
  ],
};
```

### 6. Actualizar Versión y Publicar

```bash
# Actualizar versión en package.json
npm version minor  # 0.1.0 → 0.2.0

# Publicar
npm publish
```

### 7. Actualizar en los Repos

```bash
# En saas-back, saas-admin, saas-cliente
npm update @imperiohub/lp-templates

# Backend: ejecutar seed para insertar nuevo template
npm run db:seed
```

## API de Validadores

### `validateTemplate(template)`
Valida que un template cumpla con las reglas de negocio.

```typescript
import { validateTemplate } from '@imperiohub/lp-templates';

try {
  validateTemplate(myTemplate);
  console.log('Template válido');
} catch (error) {
  console.error('Template inválido:', error);
}
```

### `validateContent(content, template)`
Valida que el content de una landing page cumpla con el schema del template.

```typescript
import { validateContent, menuTemplate } from '@imperiohub/lp-templates';

const userContent = { /* ... */ };

try {
  const validContent = validateContent(userContent, menuTemplate);
  // validContent está tipado como MenuTemplateContent
} catch (error) {
  console.error('Content inválido:', error.errors);
}
```

### `safeValidateContent(content, template)`
Versión segura que no lanza errores.

```typescript
import { safeValidateContent, menuTemplate } from '@imperiohub/lp-templates';

const result = safeValidateContent(userContent, menuTemplate);

if (result.success) {
  console.log('Content válido:', result.data);
} else {
  console.error('Errores:', result.error.errors);
}
```

## Reglas de Schemas

### Tipos de Campos Soportados
- `string`: Texto simple
- `array_string`: Array de strings
- `array_object`: Array de objetos (soporta anidación hasta 2 niveles)

### Límites
- Máximo 2 niveles de anidación en `array_object`
- Nombres de campos únicos por nivel
- Slugs en formato kebab-case

## Development

```bash
# Instalar dependencias
npm install

# Compilar TypeScript
npm run build

# Type-checking
npm run typecheck

# Linting
npm run lint

# Modo desarrollo (watch)
npm run dev
```

## Versionado

Este paquete sigue [Semantic Versioning](https://semver.org/):
- **PATCH** (0.1.X): Bug fixes, mejoras menores
- **MINOR** (0.X.0): Nuevos templates, nuevas features (retrocompatible)
- **MAJOR** (X.0.0): Breaking changes (cambios en la API)

## License

MIT
