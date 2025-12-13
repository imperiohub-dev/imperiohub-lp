# @imperiohub/lp-templates

**Versión actual:** `0.2.4`

Paquete centralizado de templates para landing pages del ecosistema ImperioHub SaaS.

## 📦 Instalación

```bash
npm install @imperiohub/lp-templates
```

## 🎯 ¿Qué es este paquete?

Un sistema unificado que proporciona:

- **Schemas de templates**: Estructura de datos estandarizada
- **Validación con Zod**: Validación runtime de contenido
- **Componentes React**: UI pre-diseñada para renderizar landing pages
- **TypeScript types**: Type safety completo en todo el ecosistema
- **Sistema de temas SCSS**: Variables CSS customizables por landing

## 🚀 Guías de Uso

### Para Backend (Node.js + Prisma)

Guía completa paso a paso para integrar los templates en tu backend:

**👉 [Guía de Backend](docs/README-BACKEND.md)**

Incluye:
- Instalación y setup inicial
- Cómo crear/validar landing pages
- Seeds de templates en Prisma
- Validación de contenido con Zod
- Manejo de errores
- Testing

---

### Para Frontend Cliente (React)

Guía para renderizar landing pages en aplicaciones de cliente:

**👉 [Guía de Cliente](docs/README-CLIENTE.md)**

Incluye:
- Setup de estilos CSS/SCSS
- Renderizar landing pages dinámicamente
- Customización de temas
- Server-side rendering (SSR)
- Optimización de performance

---

## 📚 Estructura del Proyecto

```
@imperiohub/lp-templates/
├── dist/                      # Build output
│   ├── schemas/              # Schemas + validadores (sin React)
│   ├── components/           # Componentes React
│   ├── generator/            # Utilidades Prisma (sin React)
│   └── lp-templates.css      # Estilos compilados
├── docs/                     # Documentación
│   ├── README-BACKEND.md    # Guía para backend
│   └── README-CLIENTE.md    # Guía para frontend cliente
└── src/                      # Código fuente
```

## 🎨 Templates Disponibles

| Template | Slug | Descripción |
|----------|------|-------------|
| **Menu Template** | `menu` | Landing page para menús de restaurantes con categorías, items y precios |
| **Hero con Beneficios** | `servicios-hero-beneficios` | Landing de servicios con título hero y lista de ventajas |
| **Home Page V1** | `home-page-v1` | Home page genérica con bloques de navegación |

## 🔄 Exports Modulares

El paquete ofrece imports modulares para optimizar el bundle size:

```typescript
// ✅ Solo schemas y validadores (SIN React - para Node.js)
import {
  menuTemplate,
  validateContent
} from '@imperiohub/lp-templates/schemas';

// ✅ Solo componentes React (CON React - para frontend)
import {
  MenuTemplate,
  TemplateRenderer
} from '@imperiohub/lp-templates/components';

// ✅ Solo generator para Prisma (SIN React - para seeds)
import {
  initializeTemplates
} from '@imperiohub/lp-templates/generator';
```

## ⚡ Quick Start

### Backend (Validar contenido)

```typescript
import { validateContent, menuTemplate } from '@imperiohub/lp-templates/schemas';

const content = {
  headerTitle: 'Mi Restaurante',
  headerSubtitle: 'Comida casera',
  // ... más campos
};

try {
  const validContent = validateContent(content, menuTemplate);
  // ✅ Content validado y tipado
} catch (error) {
  // ❌ Error de validación
  console.error(error.errors);
}
```

### Frontend Cliente (Renderizar landing)

```typescript
import '@imperiohub/lp-templates/dist/lp-templates.css';
import { TemplateRenderer } from '@imperiohub/lp-templates/components';

function LandingPage({ slug, content }) {
  return <TemplateRenderer templateSlug={slug} content={content} />;
}
```

## 🛠️ Scripts de Desarrollo

```bash
npm run build        # Compilar el paquete
npm run verify       # Verificar que el build es correcto
npm run typecheck    # Verificar tipos TypeScript
npm run lint         # Linter
npm run dev          # Modo desarrollo con Vite
```

## 📖 Documentación Completa

- **[Guía de Backend](docs/README-BACKEND.md)**: Setup en Node.js, Prisma, validación, seeds
- **[Guía de Cliente](docs/README-CLIENTE.md)**: Renderizado React, temas SCSS, SSR

## 🆕 Changelog

### v0.2.4 (Diciembre 2025)
- ✅ Reestructuración de documentación en carpeta `docs/`
- ✅ README principal simplificado con links a guías específicas

### v0.2.3 (Diciembre 2025)
- ✅ **FIX CRÍTICO**: Archivos `.d.ts` intermedios ahora se copian correctamente
- ✅ Script de verificación de build (`npm run verify`)
- ✅ Generación correcta de todos los archivos de tipos

Ver [changelog completo](docs/README-BACKEND.md#-changelog)

## 🤝 Contribuir

Para agregar un nuevo template, consulta la sección "Crear un Nuevo Template" en la [guía de backend](docs/README-BACKEND.md).

## 📄 Licencia

MIT © ImperioHub
