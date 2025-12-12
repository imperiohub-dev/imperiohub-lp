import { MenuTemplate } from '../components/MenuTemplate';
import { HeroBeneficiosTemplate } from '../components/HeroBeneficiosTemplate';
import { HomePageV1Template } from '../components/HomePageV1Template';

/**
 * Mapa de slugs de templates a componentes React
 */
const TEMPLATE_COMPONENTS = {
  menu: MenuTemplate,
  'servicios-hero-beneficios': HeroBeneficiosTemplate,
  'home-page-v1': HomePageV1Template,
} as const;

export type TemplateSlug = keyof typeof TEMPLATE_COMPONENTS;

export interface TemplateRendererProps {
  /** Slug del template a renderizar */
  templateSlug: TemplateSlug;
  /** Contenido del template (JSON de la DB) */
  content: unknown;
}

/**
 * TemplateRenderer
 *
 * Componente inteligente que mapea un slug de template a su componente React correspondiente.
 * Este es el componente principal que usará el saas-cliente para renderizar landing pages.
 *
 * @example
 * ```tsx
 * // En el cliente:
 * const landingData = await fetch('/api/landing-pages/my-menu')
 *
 * <TemplateRenderer
 *   templateSlug={landingData.templateSlug}
 *   content={landingData.content}
 * />
 * ```
 */
export function TemplateRenderer({
  templateSlug,
  content,
}: TemplateRendererProps) {
  const Component = TEMPLATE_COMPONENTS[templateSlug];

  if (!Component) {
    return (
      <div
        style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#fee',
          color: '#c00',
        }}
      >
        <h1>Error: Template no encontrado</h1>
        <p>
          El template <code>{templateSlug}</code> no está registrado en el
          TemplateRenderer.
        </p>
        <p>
          Templates disponibles:{' '}
          {Object.keys(TEMPLATE_COMPONENTS).join(', ')}
        </p>
      </div>
    );
  }

  // Renderizar el componente con el content
  // Nota: En producción, podrías validar el content aquí con validateContent()
  // El cast a 'never' es seguro porque cada componente espera su propio tipo de content
  return <Component content={content as never} />;
}

/**
 * Hook para obtener el componente de un template por slug
 *
 * @param slug - Slug del template
 * @returns El componente del template o undefined si no existe
 */
export function useTemplateComponent(slug: string) {
  return TEMPLATE_COMPONENTS[slug as TemplateSlug];
}

/**
 * Verifica si un slug de template existe
 *
 * @param slug - Slug a verificar
 * @returns true si el template existe, false en caso contrario
 */
export function isValidTemplateSlug(slug: string): slug is TemplateSlug {
  return slug in TEMPLATE_COMPONENTS;
}
