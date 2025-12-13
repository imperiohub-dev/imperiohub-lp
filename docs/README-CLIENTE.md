# 🎨 Guía de Implementación - Frontend Cliente (saas-cliente)

## 🆕 Última Versión: **v0.2.4** (Diciembre 2025)

Esta guía te ayudará a integrar y renderizar landing pages dinámicas en tu aplicación de cliente React.

---

## 📦 Instalación

```bash
npm install @imperiohub/lp-templates
```

**Peer dependencies necesarias:**
```bash
npm install react react-dom
```

---

## 🚀 Setup Inicial

### **Paso 1: Importar Estilos CSS**

Importa el CSS del paquete **una sola vez** en tu aplicación (generalmente en el archivo principal):

```typescript
// src/main.tsx o src/_app.tsx (Next.js)
import '@imperiohub/lp-templates/dist/lp-templates.css';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')!).render(<App />);
```

**Nota**: El archivo CSS contiene todos los estilos para todos los templates. No necesitas importar archivos SCSS individuales.

---

## 🎯 Renderizar Landing Pages

### **Opción 1: Usar `TemplateRenderer` (Recomendado)**

El componente `TemplateRenderer` mapea automáticamente el slug del template al componente correcto:

```typescript
// src/pages/LandingPage.tsx
import { TemplateRenderer } from '@imperiohub/lp-templates/components';

interface LandingPageProps {
  slug: string;
  content: unknown;
}

export function LandingPage({ slug, content }: LandingPageProps) {
  return (
    <div>
      <TemplateRenderer templateSlug={slug} content={content} />
    </div>
  );
}
```

**Cómo funciona:**
1. El backend devuelve: `{ templateSlug: 'menu', content: {...} }`
2. `TemplateRenderer` busca el componente correspondiente al slug
3. Renderiza el componente con el contenido validado

---

### **Opción 2: Importar Componentes Individuales**

Si prefieres más control, importa componentes específicos:

```typescript
import { MenuTemplate } from '@imperiohub/lp-templates/components';
import type { MenuTemplateContent } from '@imperiohub/lp-templates/schemas';

export function RestaurantMenu({ content }: { content: MenuTemplateContent }) {
  return (
    <div>
      <MenuTemplate content={content} />
    </div>
  );
}
```

---

## 🌐 Integración con API

### **Flujo completo: Obtener y renderizar landing page**

```typescript
// src/hooks/useLandingPage.ts
import { useEffect, useState } from 'react';

interface LandingPageData {
  slug: string;
  templateSlug: string;
  content: unknown;
  published: boolean;
}

export function useLandingPage(slug: string) {
  const [data, setData] = useState<LandingPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLandingPage() {
      try {
        const response = await fetch(`/api/landing-pages/${slug}`);

        if (!response.ok) {
          throw new Error('Landing page no encontrada');
        }

        const landingPage = await response.json();
        setData(landingPage);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchLandingPage();
  }, [slug]);

  return { data, loading, error };
}
```

**Usar el hook:**

```typescript
// src/pages/[slug].tsx
import { TemplateRenderer } from '@imperiohub/lp-templates/components';
import { useLandingPage } from '../hooks/useLandingPage';

export default function LandingPageRoute() {
  const slug = window.location.pathname.slice(1); // Obtener slug de la URL
  const { data, loading, error } = useLandingPage(slug);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Landing page no encontrada</div>;

  if (!data.published) {
    return <div>Esta landing page no está publicada</div>;
  }

  return (
    <TemplateRenderer
      templateSlug={data.templateSlug}
      content={data.content}
    />
  );
}
```

---

## 🎨 Customización de Estilos

### **Opción 1: Variables CSS (Recomendado)**

El paquete usa variables CSS que puedes sobrescribir:

```css
/* src/styles/landing-custom.css */
:root {
  /* Colores principales */
  --lp-primary-color: #ff6b6b;
  --lp-secondary-color: #4ecdc4;
  --lp-background-color: #f7f7f7;
  --lp-text-color: #333;

  /* Tipografía */
  --lp-font-family: 'Inter', sans-serif;
  --lp-heading-font: 'Montserrat', sans-serif;

  /* Espaciado */
  --lp-spacing-sm: 0.5rem;
  --lp-spacing-md: 1rem;
  --lp-spacing-lg: 2rem;
  --lp-spacing-xl: 4rem;
}
```

Importa este archivo después del CSS del paquete:

```typescript
import '@imperiohub/lp-templates/dist/lp-templates.css';
import './styles/landing-custom.css';
```

---

### **Opción 2: Temas por Landing Page**

Puedes aplicar temas diferentes por landing page usando data attributes:

```typescript
export function LandingPage({ slug, content, theme }: LandingPageProps) {
  return (
    <div data-theme={theme}>
      <TemplateRenderer templateSlug={slug} content={content} />
    </div>
  );
}
```

```css
/* Tema oscuro */
[data-theme="dark"] {
  --lp-background-color: #1a1a1a;
  --lp-text-color: #ffffff;
  --lp-primary-color: #61dafb;
}

/* Tema navidad */
[data-theme="christmas"] {
  --lp-primary-color: #c41e3a;
  --lp-secondary-color: #165b33;
  --lp-background-color: #fff5e6;
}
```

---

### **Opción 3: Estilos Custom con CSS Modules**

Si necesitas estilos completamente custom:

```typescript
import { MenuTemplate } from '@imperiohub/lp-templates/components';
import styles from './CustomMenu.module.css';

export function CustomMenu({ content }) {
  return (
    <div className={styles.customWrapper}>
      <MenuTemplate content={content} />
    </div>
  );
}
```

```css
/* CustomMenu.module.css */
.customWrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.customWrapper h1 {
  font-size: 3rem;
  color: var(--brand-color);
}
```

---

## 🔥 Server-Side Rendering (SSR)

### **Next.js App Router**

```typescript
// app/[slug]/page.tsx
import { TemplateRenderer } from '@imperiohub/lp-templates/components';

async function getLandingPage(slug: string) {
  const res = await fetch(`${process.env.API_URL}/landing-pages/${slug}`, {
    cache: 'no-store', // o 'force-cache' para cachear
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function LandingPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getLandingPage(params.slug);

  if (!data) {
    return <div>Landing page no encontrada</div>;
  }

  return (
    <TemplateRenderer
      templateSlug={data.templateSlug}
      content={data.content}
    />
  );
}

// Generar metadata dinámicamente
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getLandingPage(params.slug);

  return {
    title: data?.content?.headerTitle || 'Landing Page',
    description: data?.content?.headerSubtitle || '',
  };
}
```

---

### **Next.js Pages Router**

```typescript
// pages/[slug].tsx
import { GetServerSideProps } from 'next';
import { TemplateRenderer } from '@imperiohub/lp-templates/components';

interface Props {
  landingPage: {
    templateSlug: string;
    content: unknown;
  };
}

export default function LandingPage({ landingPage }: Props) {
  return (
    <TemplateRenderer
      templateSlug={landingPage.templateSlug}
      content={landingPage.content}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;

  const res = await fetch(`${process.env.API_URL}/landing-pages/${slug}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const landingPage = await res.json();

  return {
    props: { landingPage },
  };
};
```

---

## ⚡ Optimización de Performance

### **1. Code Splitting por Template**

Carga componentes solo cuando se necesitan:

```typescript
import { lazy, Suspense } from 'react';

const MenuTemplate = lazy(() =>
  import('@imperiohub/lp-templates/components').then((m) => ({
    default: m.MenuTemplate,
  }))
);

export function LandingPage({ content }) {
  return (
    <Suspense fallback={<div>Cargando template...</div>}>
      <MenuTemplate content={content} />
    </Suspense>
  );
}
```

---

### **2. Caché de API con SWR**

```bash
npm install swr
```

```typescript
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useLandingPage(slug: string) {
  const { data, error, isLoading } = useSWR(
    `/api/landing-pages/${slug}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    loading: isLoading,
    error,
  };
}
```

---

### **3. Optimización de Imágenes**

Si tus templates usan imágenes, usa `next/image`:

```typescript
import Image from 'next/image';

export function CustomMenuTemplate({ content }) {
  return (
    <div>
      {content.imageUrl && (
        <Image
          src={content.imageUrl}
          alt={content.headerTitle}
          width={800}
          height={400}
          priority
        />
      )}
      {/* resto del template */}
    </div>
  );
}
```

---

## 🧪 Testing

### **Test de renderizado de componentes**

```typescript
// MenuTemplate.test.tsx
import { render, screen } from '@testing-library/react';
import { MenuTemplate } from '@imperiohub/lp-templates/components';
import type { MenuTemplateContent } from '@imperiohub/lp-templates/schemas';

describe('MenuTemplate', () => {
  const mockContent: MenuTemplateContent = {
    headerTitle: 'Mi Restaurante',
    headerSubtitle: 'Comida casera',
    headerTagline: 'Desde 1990',
    menuSections: [
      {
        categoryName: 'Entradas',
        items: [
          {
            name: 'Ensalada César',
            price: { label: 'Precio', value: '$10' },
          },
        ],
      },
    ],
    footerTitle: 'Contacto',
    footerInfo: [{ text: 'Tel: 123-456-7890' }],
    footerMessage: '¡Gracias por visitarnos!',
    ctas: [{ text: 'Reservar', type: 'primary' }],
  };

  it('renderiza el título correctamente', () => {
    render(<MenuTemplate content={mockContent} />);
    expect(screen.getByText('Mi Restaurante')).toBeInTheDocument();
  });

  it('renderiza las secciones del menú', () => {
    render(<MenuTemplate content={mockContent} />);
    expect(screen.getByText('Entradas')).toBeInTheDocument();
    expect(screen.getByText('Ensalada César')).toBeInTheDocument();
  });
});
```

---

## 🐛 Troubleshooting

### **Error: "Cannot find module '@imperiohub/lp-templates/dist/lp-templates.css'"**

**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

---

### **Estilos no se aplican correctamente**

**Verifica que:**
1. Importaste el CSS: `import '@imperiohub/lp-templates/dist/lp-templates.css'`
2. El import está en un archivo que se ejecuta al inicio de la app
3. No hay conflictos con CSS global de tu app

---

### **TypeScript no reconoce los tipos**

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "bundler", // o "node"
    "esModuleInterop": true,
    "jsx": "react-jsx"
  }
}
```

---

### **Componente no renderiza nada**

Verifica que:
1. El `content` tiene la estructura correcta
2. El `templateSlug` coincide con un template existente
3. Revisa la consola del navegador para errores

---

## 📚 Referencia de Componentes

### **TemplateRenderer**

```typescript
interface TemplateRendererProps {
  templateSlug: string;  // 'menu', 'servicios-hero-beneficios', 'home-page-v1'
  content: unknown;       // Contenido validado del template
}
```

### **MenuTemplate**

```typescript
interface MenuTemplateProps {
  content: MenuTemplateContent;
}
```

### **HeroBeneficiosTemplate**

```typescript
interface HeroBeneficiosTemplateProps {
  content: HeroConBeneficiosContent;
}
```

### **HomePageV1Template**

```typescript
interface HomePageV1TemplateProps {
  content: HomePageV1Content;
}
```

---

## 🔗 Links Útiles

- [Guía de Backend](./README-BACKEND.md)
- [NPM Package](https://www.npmjs.com/package/@imperiohub/lp-templates)
- [Changelog](./README-BACKEND.md#-changelog)

---

**Versión del paquete:** `0.2.4`
**Última actualización:** Diciembre 2025
**Estado:** ✅ Listo para producción
