import type { LandingPageTemplate } from '../types';

/**
 * Template para Home Page V1
 *
 * Estructura:
 * - Hero Section: Título grande + subtítulo + CTA button
 * - Second Section: Título + subtítulo + 3 bloques de navegación
 *
 * Los 3 bloques llevan a:
 * - Servicios (/servicios)
 * - Blog (/blog)
 * - Agendar Cita (/agendar-cita)
 */
export const homePageV1Template: LandingPageTemplate = {
  name: 'Crea tu homepage',
  slug: 'home-page-v1',
  schema: {
    fields: [
      // === HERO SECTION ===
      {
        name: 'heroTitle',
        label: 'Hero - Título principal',
        type: 'string',
        required: true,
      },
      {
        name: 'heroSubtitle',
        label: 'Hero - Subtítulo',
        type: 'string',
        required: true,
      },
      {
        name: 'heroCtaText',
        label: 'Hero - Texto del botón CTA',
        type: 'string',
        required: true,
      },
      {
        name: 'heroCtaUrl',
        label: 'Hero - URL del botón CTA',
        type: 'string',
        required: false,
      },

      // === SECOND SECTION ===
      {
        name: 'secondTitle',
        label: 'Segunda sección - Título',
        type: 'string',
        required: true,
      },
      {
        name: 'secondSubtitle',
        label: 'Segunda sección - Subtítulo',
        type: 'string',
        required: true,
      },

      // === 3 BLOQUES DE NAVEGACIÓN ===
      {
        name: 'navigationBlocks',
        label: 'Bloques de navegación (3 bloques)',
        type: 'array_object',
        required: true,
        objectFields: [
          {
            name: 'title',
            label: 'Título del bloque',
            type: 'string',
            required: true,
          },
          {
            name: 'subtitle',
            label: 'Subtítulo del bloque',
            type: 'string',
            required: true,
          },
          {
            name: 'linkUrl',
            label: 'URL del enlace',
            type: 'string',
            required: true,
          },
          {
            name: 'linkText',
            label: 'Texto del enlace',
            type: 'string',
            required: false,
          },
        ],
      },
    ],
  },
};

/**
 * TypeScript types para el content del template Home Page V1
 */
export interface HomePageV1Content {
  // === HERO SECTION ===
  heroTitle: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaUrl?: string;

  // === SECOND SECTION ===
  secondTitle: string;
  secondSubtitle: string;

  // === 3 BLOQUES DE NAVEGACIÓN ===
  navigationBlocks: Array<{
    title: string;
    subtitle: string;
    linkUrl: string;
    linkText?: string;
  }>;
}
