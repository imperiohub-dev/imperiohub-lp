# Guía de Uso - @imperiohub/lp-templates

Esta guía explica cómo usar el paquete `@imperiohub/lp-templates` en cada uno de los 3 repositorios del ecosistema ImperioHub.

---

## 🔧 Backend (`saas-back`)

### Instalación
```bash
npm install @imperiohub/lp-templates
```

### Uso en Seeds (Insertar Templates en DB)

```typescript
// prisma/seeds/templates.ts
import { PrismaClient } from '@prisma/client';
import {
  allTemplates,
  initializeTemplates
} from '@imperiohub/lp-templates/generator';

const prisma = new PrismaClient();

async function seedTemplates() {
  console.log('🌱 Seeding landing page templates...');

  await initializeTemplates(allTemplates, prisma);

  console.log('✅ Templates seeded successfully');
}

seedTemplates()
  .catch((error) => {
    console.error('❌ Error seeding templates:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Uso en API (Validar Content antes de guardar)

```typescript
// src/api/landing-pages/create.ts
import { validateContent, templatesBySlug } from '@imperiohub/lp-templates';
import type { MenuTemplateContent } from '@imperiohub/lp-templates';

export async function createLandingPage(req, res) {
  const { templateSlug, content } = req.body;

  // 1. Obtener el template desde la DB
  const template = await prisma.landingPageTemplate.findUnique({
    where: { slug: templateSlug }
  });

  if (!template) {
    return res.status(404).json({ error: 'Template not found' });
  }

  // 2. Obtener el schema del template desde el paquete
  const templateSchema = templatesBySlug[templateSlug];

  // 3. Validar el content con Zod
  try {
    const validatedContent = validateContent<MenuTemplateContent>(
      content,
      templateSchema
    );

    // 4. Guardar en la DB
    const landingPage = await prisma.landingPage.create({
      data: {
        adminId: req.user.id,
        templateId: template.id,
        websiteConfigId: req.body.websiteConfigId,
        content: validatedContent,
        slug: req.body.slug,
      }
    });

    return res.json(landingPage);
  } catch (error) {
    // Error de validación de Zod
    return res.status(400).json({
      error: 'Invalid content',
      details: error.errors
    });
  }
}
```

---

## 🎨 Admin Panel (`saas-admin`)

### Instalación
```bash
npm install @imperiohub/lp-templates
```

### Uso: Listar Templates Disponibles

```typescript
// src/pages/landing-pages/new.tsx
import { allTemplates } from '@imperiohub/lp-templates';

export function NewLandingPage() {
  return (
    <div>
      <h1>Crear Nueva Landing Page</h1>
      <select name="template">
        {allTemplates.map((template) => (
          <option key={template.slug} value={template.slug}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### Uso: Generar Formulario Dinámico

```typescript
// src/components/DynamicForm.tsx
import type { LandingPageTemplate, SchemaField } from '@imperiohub/lp-templates';

interface DynamicFormProps {
  template: LandingPageTemplate;
  onSubmit: (content: unknown) => void;
}

export function DynamicForm({ template, onSubmit }: DynamicFormProps) {
  const [formData, setFormData] = useState({});

  const renderField = (field: SchemaField) => {
    switch (field.type) {
      case 'string':
        return (
          <input
            type="text"
            placeholder={field.label}
            required={field.required}
            onChange={(e) => setFormData({
              ...formData,
              [field.name]: e.target.value
            })}
          />
        );

      case 'array_string':
        return (
          <textarea
            placeholder={`${field.label} (uno por línea)`}
            required={field.required}
            onChange={(e) => setFormData({
              ...formData,
              [field.name]: e.target.value.split('\n')
            })}
          />
        );

      case 'array_object':
        // Implementar lógica para array de objetos
        return <ArrayObjectField field={field} />;

      default:
        return null;
    }
  };

  return (
    <form onSubmit={() => onSubmit(formData)}>
      <h2>{template.name}</h2>
      {template.schema.fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          {renderField(field)}
        </div>
      ))}
      <button type="submit">Crear Landing Page</button>
    </form>
  );
}
```

### Uso: Obtener Tipos TypeScript

```typescript
// src/types/landing-pages.ts
import type {
  MenuTemplateContent,
  // Importar otros tipos de templates según se necesiten
} from '@imperiohub/lp-templates';

// Usar los tipos en tus componentes
export interface LandingPageData {
  id: string;
  templateSlug: string;
  content: MenuTemplateContent; // Type-safe!
}
```

---

## 🌐 Cliente (`saas-cliente`)

### Instalación
```bash
npm install @imperiohub/lp-templates
```

### Uso: Renderizar Landing Page

```typescript
// src/pages/[slug].tsx (Next.js example)
import { TemplateRenderer } from '@imperiohub/lp-templates';

interface LandingPageProps {
  landingPage: {
    templateSlug: string;
    content: unknown;
  };
}

export default function LandingPage({ landingPage }: LandingPageProps) {
  return (
    <TemplateRenderer
      templateSlug={landingPage.templateSlug}
      content={landingPage.content}
    />
  );
}

// Fetch data desde la API del backend
export async function getServerSideProps({ params }) {
  const res = await fetch(`https://api.imperiohub.com/landing-pages/${params.slug}`);
  const landingPage = await res.json();

  return {
    props: { landingPage }
  };
}
```

### Uso: Verificar si un Template Existe

```typescript
// src/utils/templates.ts
import { isValidTemplateSlug } from '@imperiohub/lp-templates';

export function handleTemplateRendering(slug: string) {
  if (!isValidTemplateSlug(slug)) {
    console.error(`Template "${slug}" no existe`);
    return <NotFoundPage />;
  }

  // Renderizar normalmente
  return <TemplateRenderer templateSlug={slug} content={content} />;
}
```

---

## 🔄 Flujo de Actualización

### Cuando se agrega un nuevo template:

1. **Desarrollador actualiza el paquete**:
   ```bash
   cd imperiohub-lp-templates
   # Crear nuevo template en src/schemas/templates/
   # Crear nuevo componente en src/components/
   npm version minor  # 0.1.0 → 0.2.0
   npm publish
   ```

2. **Backend actualiza y ejecuta seed**:
   ```bash
   cd saas-back
   npm update @imperiohub/lp-templates
   npm run db:seed  # Inserta nuevos templates en DB
   ```

3. **Admin actualiza**:
   ```bash
   cd saas-admin
   npm update @imperiohub/lp-templates
   # Automáticamente verá el nuevo template en la lista
   ```

4. **Cliente actualiza**:
   ```bash
   cd saas-cliente
   npm update @imperiohub/lp-templates
   # Automáticamente puede renderizar el nuevo template
   ```

---

## 📊 Resumen de Imports por Repositorio

| Repositorio | Imports Principales |
|-------------|---------------------|
| **saas-back** | `allTemplates`, `initializeTemplates`, `validateContent`, `templatesBySlug` |
| **saas-admin** | `allTemplates`, `LandingPageTemplate`, tipos de content |
| **saas-cliente** | `TemplateRenderer`, `isValidTemplateSlug` |

---

## 🐛 Debugging

### Backend: Ver schemas de templates
```typescript
import { menuTemplate } from '@imperiohub/lp-templates';
console.log(JSON.stringify(menuTemplate.schema, null, 2));
```

### Admin: Validar content antes de enviar
```typescript
import { safeValidateContent, menuTemplate } from '@imperiohub/lp-templates';

const result = safeValidateContent(formData, menuTemplate);
if (!result.success) {
  console.error('Errores de validación:', result.error.errors);
}
```

### Cliente: Ver ejemplos de content
```typescript
import { menuExample } from '@imperiohub/lp-templates';
console.log('Ejemplo de content:', menuExample);
```
