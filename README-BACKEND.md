# 🔧 Guía de Implementación - Backend (saas-back)

## 🆕 Última Versión: **v0.2.3** (Diciembre 2025)

### ✅ Problemas Críticos Corregidos

En esta versión se han solucionado todos los problemas reportados:

| Problema | Estado | Descripción |
|----------|--------|-------------|
| ❌ Tipos TypeScript vacíos | ✅ **RESUELTO** | Los archivos `.d.ts` ahora se generan correctamente con todos los exports |
| ❌ Archivos `.d.ts` intermedios faltantes | ✅ **RESUELTO** | `types.d.ts`, `validators/index.d.ts`, `templates/index.d.ts` ahora existen en dist |
| ❌ Exports modulares faltantes | ✅ **RESUELTO** | Estructura `dist/schemas/`, `dist/components/`, `dist/generator/` creada |
| ❌ Dependencia React en Node.js | ✅ **RESUELTO** | React marcado como `external`, no se bundlea en schemas/generator |
| ❌ Nombre inconsistente | ✅ **RESUELTO** | Export unificado como `heroBeneficiosTemplate` |

### 🔧 Cambios Técnicos

- **Build system**: Configurado Vite con múltiples entry points
- **Type generation**: Script custom que genera `.d.ts` para cada módulo
- **Separación de bundles**: Schemas/generator son bundles independientes sin React
- **TypeScript strict mode**: Todos los errores de tipos corregidos

---

## 📋 Resumen de Cambios

El paquete `@imperiohub/lp-templates` ha sido completamente reestructurado con:

- ✅ **Validación con Zod**: Runtime validation para templates y contenido
- ✅ **TypeScript types**: Tipos completos exportados desde el paquete
- ✅ **Arquitectura modular**: Exports separados para schemas, components y generator
- ✅ **3 Templates disponibles**: menu, servicios-hero-beneficios, home-page-v1
- ✅ **Sistema de themes SCSS**: Cada landing puede tener variables custom

---

## 🚀 Actualizar el Paquete

```bash
npm install @imperiohub/lp-templates@latest
```

---

## 📦 Exports Disponibles

El paquete exporta módulos separados:

```typescript
// Schemas y validadores (SIN React - funciona en Node.js)
import {
  validateTemplate,
  validateContent,
  safeValidateContent,
  menuTemplate,
  heroBeneficiosTemplate, // ✅ Nombre corregido
  homePageV1Template,
  type LandingPageTemplate,
  type MenuTemplateContent,
  type HeroConBeneficiosContent, // Nombre del type se mantiene igual
  type HomePageV1Content
} from '@imperiohub/lp-templates/schemas';

// Generador de Prisma (SIN React - funciona en Node.js)
import {
  createLandingPageTemplate,
  initializeTemplates
} from '@imperiohub/lp-templates/generator';

// Componentes React (CON React - solo para frontend)
import {
  MenuTemplate,
  HeroBeneficiosTemplate,
  HomePageV1Template,
  TemplateRenderer
} from '@imperiohub/lp-templates/components';
```

---

## 🔄 Migración del Código Existente

### **Antes (sistema viejo):**
```typescript
// ❌ Ya no usar validación manual
function validateLandingPageContent(content: any, template: any) {
  // Validación manual...
}
```

### **Ahora (sistema nuevo):**
```typescript
import { validateContent } from '@imperiohub/lp-templates/schemas';
import type { LandingPageTemplate } from '@imperiohub/lp-templates/schemas';

// ✅ Validación automática con Zod
const validatedContent = validateContent(content, template);
// Si falla, lanza ZodError con detalles específicos
```

---

## 📝 Uso en Servicios

### **1. Validar Contenido al Crear/Actualizar Landing Page**

```typescript
// src/services/landingPageService.ts
import { validateContent } from '@imperiohub/lp-templates/schemas';
import type { LandingPageTemplate } from '@imperiohub/lp-templates/schemas';

export async function createLandingPage(
  userId: string,
  templateId: string,
  content: unknown
) {
  // 1. Obtener el template de la DB
  const template = await prisma.landingPageTemplate.findUnique({
    where: { id: templateId }
  });

  if (!template) {
    throw new Error('Template not found');
  }

  // 2. Validar el contenido contra el schema del template
  try {
    const validatedContent = validateContent(
      content,
      template as LandingPageTemplate
    );

    // 3. Guardar en DB con contenido validado
    return await prisma.landingPage.create({
      data: {
        userId,
        templateId,
        content: validatedContent as any, // Prisma JsonValue
        slug: generateSlug(), // Tu función para generar slug
        published: false,
      }
    });
  } catch (error) {
    if (error instanceof ZodError) {
      // Error de validación - enviar detalles al cliente
      throw new ValidationError('Invalid content', error.errors);
    }
    throw error;
  }
}

export async function updateLandingPage(
  landingPageId: string,
  content: unknown
) {
  // 1. Obtener landing page con su template
  const landingPage = await prisma.landingPage.findUnique({
    where: { id: landingPageId },
    include: { template: true }
  });

  if (!landingPage) {
    throw new Error('Landing page not found');
  }

  // 2. Validar nuevo contenido
  const validatedContent = validateContent(
    content,
    landingPage.template as LandingPageTemplate
  );

  // 3. Actualizar en DB
  return await prisma.landingPage.update({
    where: { id: landingPageId },
    data: { content: validatedContent as any }
  });
}
```

### **2. Validación "Safe" (No lanza errores)**

Si prefieres manejar errores sin try/catch:

```typescript
import { safeValidateContent } from '@imperiohub/lp-templates/schemas';

export async function validateLandingPageDraft(
  templateId: string,
  content: unknown
) {
  const template = await prisma.landingPageTemplate.findUnique({
    where: { id: templateId }
  });

  if (!template) {
    return { success: false, error: 'Template not found' };
  }

  // Validación segura - retorna objeto con success/error
  const result = safeValidateContent(
    content,
    template as LandingPageTemplate
  );

  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors // Array de errores Zod
    };
  }

  return {
    success: true,
    data: result.data // Contenido validado
  };
}
```

---

## 🗄️ Seeds de Templates

Los templates ya están disponibles en el paquete. Actualiza tus seeds:

```typescript
// prisma/seeds/templates.ts
import {
  menuTemplate,
  heroBeneficiosTemplate,
  homePageV1Template
} from '@imperiohub/lp-templates/schemas';

export async function seedTemplates() {
  const templates = [
    menuTemplate,
    heroBeneficiosTemplate,
    homePageV1Template,
  ];

  for (const template of templates) {
    await prisma.landingPageTemplate.upsert({
      where: { slug: template.slug },
      update: {
        name: template.name,
        description: `Template for ${template.name}`,
        schema: template.schema as any, // Prisma JsonValue
        exampleContent: template.exampleContent as any,
      },
      create: {
        slug: template.slug,
        name: template.name,
        description: `Template for ${template.name}`,
        schema: template.schema as any,
        exampleContent: template.exampleContent as any,
      },
    });
  }

  console.log('✅ Templates seeded successfully');
}
```

Ejecutar seeds:
```bash
npx prisma db seed
```

---

## 🛣️ Endpoints (Ya implementados)

Tus endpoints existentes deberían funcionar igual, solo asegúrate de usar las nuevas validaciones:

### **GET /api/templates**
```typescript
// Ya implementado - solo asegúrate que retorna los templates
router.get('/templates', async (req, res) => {
  const templates = await prisma.landingPageTemplate.findMany();
  res.json(templates);
});
```

### **POST /api/landing-pages**
```typescript
// Ya implementado - asegúrate de usar validateContent
router.post('/landing-pages', authenticateUser, async (req, res) => {
  const { templateId, content, slug } = req.body;

  try {
    const landingPage = await landingPageService.createLandingPage(
      req.user.id,
      templateId,
      content // <-- Esto se valida internamente con validateContent
    );

    res.status(201).json(landingPage);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details
      });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

### **GET /api/landing-pages/:slug**
```typescript
// Ya implementado - retorna landing page con template
router.get('/landing-pages/:slug', async (req, res) => {
  const landingPage = await prisma.landingPage.findUnique({
    where: { slug: req.params.slug },
    include: { template: true }
  });

  if (!landingPage) {
    return res.status(404).json({ error: 'Landing page not found' });
  }

  res.json(landingPage);
});
```

---

## 🔍 TypeScript Types

El paquete exporta tipos completos para TypeScript:

```typescript
import type {
  LandingPageTemplate,
  TemplateSchema,
  SchemaField,
  FieldType,
  MenuTemplateContent,
  HeroConBeneficiosContent,
  HomePageV1Content,
} from '@imperiohub/lp-templates/schemas';

// Usar en tus funciones
async function getLandingPageWithType(slug: string): Promise<{
  template: LandingPageTemplate;
  content: MenuTemplateContent | HeroConBeneficiosContent | HomePageV1Content;
}> {
  // ...
}
```

---

## 📊 Estructura de Templates

### **Template disponibles:**

#### 1. **Menu Template** (slug: `menu`)
```typescript
import { menuTemplate } from '@imperiohub/lp-templates/schemas';
import type { MenuTemplateContent } from '@imperiohub/lp-templates/schemas';

// Estructura del contenido:
const content: MenuTemplateContent = {
  headerTitle: string;
  headerSubtitle: string;
  headerTagline: string;
  imageUrl?: string; // Opcional
  menuSections: Array<{
    categoryName: string;
    items: Array<{
      name: string;
      details?: string;
      price?: { label: string; value: string };
      prices?: Array<{ label: string; value: string }>;
    }>;
  }>;
  combos?: Array<{
    name: string;
    price: string;
    items: string[];
  }>;
  footerTitle: string;
  footerInfo: Array<{ text: string; highlight?: string }>;
  footerMessage: string;
  ctas: Array<{ text: string; url?: string; type: 'primary' | 'secondary' }>;
};
```

#### 2. **Hero con Beneficios Template** (slug: `servicios-hero-beneficios`)
```typescript
import { heroBeneficiosTemplate } from '@imperiohub/lp-templates/schemas';
import type { HeroConBeneficiosContent } from '@imperiohub/lp-templates/schemas';

// Estructura del contenido:
const content: HeroConBeneficiosContent = {
  title: string;
  titleP: string;
  subtitle: string;
  subtitleP?: string;
  ventajas?: string[];
  ctas?: Array<{ text: string; url?: string }>;
};
```

#### 3. **Home Page V1 Template** (slug: `home-page-v1`)
```typescript
import { homePageV1Template } from '@imperiohub/lp-templates/schemas';
import type { HomePageV1Content } from '@imperiohub/lp-templates/schemas';

// Estructura del contenido:
const content: HomePageV1Content = {
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaUrl?: string;
  secondTitle: string;
  secondSubtitle: string;
  navigationBlocks: Array<{
    title: string;
    subtitle: string;
    linkText?: string;
    linkUrl: string;
  }>;
};
```

---

## ⚠️ Errores de Validación

Cuando la validación falla, Zod lanza un `ZodError` con detalles específicos:

```typescript
import { ZodError } from 'zod';

try {
  const validatedContent = validateContent(content, template);
} catch (error) {
  if (error instanceof ZodError) {
    console.log(error.errors);
    // [
    //   {
    //     code: 'invalid_type',
    //     expected: 'string',
    //     received: 'number',
    //     path: ['headerTitle'],
    //     message: 'Expected string, received number'
    //   }
    // ]
  }
}
```

Puedes enviar estos errores al cliente para que el admin UI muestre errores específicos por campo.

---

## 🧪 Testing

Ejemplo de tests para tus servicios:

```typescript
import { validateContent, menuTemplate } from '@imperiohub/lp-templates/schemas';

describe('LandingPage Service', () => {
  it('should validate correct menu content', () => {
    const validContent = {
      headerTitle: 'Mi Restaurante',
      headerSubtitle: 'Comida casera',
      headerTagline: 'Desde 1990',
      menuSections: [
        {
          categoryName: 'Entradas',
          items: [
            { name: 'Ensalada', price: { label: 'Precio', value: '$10' } }
          ]
        }
      ],
      footerTitle: 'Contacto',
      footerInfo: [{ text: 'Tel: 123456' }],
      footerMessage: 'Gracias por visitarnos',
      ctas: [{ text: 'Reservar', type: 'primary' as const }]
    };

    expect(() => validateContent(validContent, menuTemplate)).not.toThrow();
  });

  it('should reject invalid menu content', () => {
    const invalidContent = {
      headerTitle: 123, // ❌ Debería ser string
      // Faltan campos requeridos
    };

    expect(() => validateContent(invalidContent, menuTemplate)).toThrow(ZodError);
  });
});
```

---

## 📚 Referencia Rápida

### **Funciones principales:**

| Función | Descripción | Retorno |
|---------|-------------|---------|
| `validateTemplate(data)` | Valida estructura del template | `LandingPageTemplate` (lanza error si falla) |
| `validateContent(content, template)` | Valida contenido contra schema del template | `T` (genérico, lanza error si falla) |
| `safeValidateContent(content, template)` | Validación segura sin lanzar errores | `{ success: true, data: T } \| { success: false, error: ZodError }` |

### **Templates disponibles:**

| Constante | Slug | Type |
|-----------|------|------|
| `menuTemplate` | `menu` | `MenuTemplateContent` |
| `heroBeneficiosTemplate` | `servicios-hero-beneficios` | `HeroConBeneficiosContent` |
| `homePageV1Template` | `home-page-v1` | `HomePageV1Content` |

---

## 🐛 Troubleshooting

### **Error: "Undefined mixin" al hacer build**
- ✅ Ya resuelto en la última versión del paquete
- Asegúrate de tener `@imperiohub/lp-templates@latest`

### **Error: "Cannot find module '@imperiohub/lp-templates/schemas'"**
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### **TypeScript no reconoce los tipos**
```json
// tsconfig.json - asegúrate de tener:
{
  "compilerOptions": {
    "moduleResolution": "node",
    "esModuleInterop": true
  }
}
```

### **Contenido válido pero Zod rechaza**
- Verifica que estás usando el template correcto
- Revisa que los campos opcionales tengan `?` en el tipo
- Usa `safeValidateContent` para ver errores detallados

---

## 📞 Soporte

Si tienes problemas con la implementación:
1. Verifica que tienes la última versión: `npm list @imperiohub/lp-templates`
2. Revisa los ejemplos en este README
3. Consulta los tipos exportados: `import type { ... } from '@imperiohub/lp-templates/schemas'`

---

**Versión del paquete:** `0.1.0`
**Última actualización:** Diciembre 2025

---

## ✅ Verificar la Instalación

Después de instalar el paquete, verifica que todo funcione correctamente:

### **Test rápido en Node.js:**

```typescript
// test-import.ts
import { menuTemplate, heroBeneficiosTemplate } from '@imperiohub/lp-templates/schemas';

console.log('✅ menuTemplate:', menuTemplate.name);
console.log('✅ heroBeneficiosTemplate:', heroBeneficiosTemplate.name);
console.log('✅ Imports funcionando correctamente!');
```

Ejecutar:
```bash
npx tsx test-import.ts
```

**Resultado esperado:**
```
✅ menuTemplate: Christmas Menu V2
✅ heroBeneficiosTemplate: Hero con Beneficios
✅ Imports funcionando correctamente!
```

### **Verificar archivos `.d.ts` intermedios (CRÍTICO):**

Este comando verifica que todos los archivos TypeScript necesarios existan:

```bash
# En el directorio del paquete (si lo tienes clonado)
npm run verify
```

O manualmente verifica que estos archivos existan en `node_modules/@imperiohub/lp-templates/`:

```bash
ls node_modules/@imperiohub/lp-templates/dist/schemas/
```

**Deberías ver:**
```
index.d.ts          ✅ Entry point principal
types.d.ts          ✅ CRÍTICO - Definiciones de tipos base
validators/         ✅ CRÍTICO - Contiene index.d.ts con validadores
templates/          ✅ CRÍTICO - Contiene index.d.ts + templates individuales
index.js
index.cjs
```

Si **NO** ves `types.d.ts`, `validators/`, o `templates/`, el paquete está mal compilado. Reinstala:

```bash
rm -rf node_modules/@imperiohub/lp-templates
npm install @imperiohub/lp-templates@latest
```

### **Verificar tipos TypeScript:**

```bash
# Debería pasar sin errores
npx tsc --noEmit test-import.ts
```

### **Verificar estructura del paquete:**

```bash
npm list @imperiohub/lp-templates
```

Deberías ver:
```
@imperiohub/lp-templates@0.2.3
```

---

## 🔄 Changelog

### **v0.2.3** (Diciembre 2025)
- ✅ **FIX CRÍTICO**: Archivos `.d.ts` intermedios ahora se copian correctamente
  - Antes: `dist/schemas/index.d.ts` importaba desde `./types`, `./validators`, `./templates` pero estos archivos NO existían
  - Ahora: Script `copy-types.js` copia recursivamente TODOS los `.d.ts` incluyendo:
    - `dist/schemas/types.d.ts` ✅
    - `dist/schemas/validators/index.d.ts` ✅
    - `dist/schemas/templates/index.d.ts` + todos los templates individuales ✅
- ✅ **FIX**: Generación correcta de archivos `.d.ts` para todos los entry points
- ✅ **FIX**: Estructura de carpetas `dist/schemas/`, `dist/components/`, `dist/generator/`
- ✅ **FIX**: React no se bundlea en módulos de Node.js (schemas/generator)
- ✅ **FIX**: Export unificado como `heroBeneficiosTemplate` (antes `heroConBeneficiosTemplate`)
- ✅ **BUILD**: Script custom para generar tipos con preservación de estructura
- ✅ **TS**: Todos los errores de TypeScript strict mode corregidos

### **v0.2.2** (Diciembre 2025)
- ❌ Tipos TypeScript vacíos (corregido en v0.2.3)
- ❌ Exports modulares no funcionaban (corregido en v0.2.3)

### **v0.2.0** (Diciembre 2025)
- 🎨 Migración a SCSS con sistema de themes
- 📦 Arquitectura modular con exports separados
- ✅ Validación con Zod
- 🚀 3 templates disponibles

---

**Versión del paquete:** `0.2.3`  
**Última actualización:** Diciembre 2025  
**Estado:** ✅ Todos los problemas críticos resueltos
