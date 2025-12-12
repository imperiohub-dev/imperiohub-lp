import type { LandingPageTemplate } from '../types';

/**
 * Template: Hero con Beneficios
 *
 * Template ideal para páginas de servicios que quieren mostrar
 * un título principal con un listado de ventajas o beneficios.
 */
export const heroBeneficiosTemplate: LandingPageTemplate = {
  name: 'Hero con Beneficios',
  slug: 'servicios-hero-beneficios',
  schema: {
    fields: [
      {
        name: 'title',
        label: 'Título principal',
        type: 'string',
        required: true,
      },
      {
        name: 'titleP',
        label: 'Párrafo del título',
        type: 'string',
        required: true,
      },
      {
        name: 'subtitle',
        label: 'Subtítulo',
        type: 'string',
        required: true,
      },
      {
        name: 'subtitleP',
        label: 'Párrafo del subtítulo',
        type: 'string',
        required: false,
      },
      {
        name: 'ventajas',
        label: 'Ventajas',
        type: 'array_string',
        required: false,
      },
      {
        name: 'ctas',
        label: 'Llamados a la acción',
        type: 'array_object',
        required: false,
        objectFields: [
          {
            name: 'text',
            label: 'Texto del botón',
            type: 'string',
            required: true,
          },
          {
            name: 'url',
            label: 'URL o acción',
            type: 'string',
            required: false,
          },
        ],
      },
    ],
  },
};

/**
 * TypeScript types para el content del template Hero con Beneficios
 */
export interface HeroConBeneficiosContent {
  title: string;
  titleP: string;
  subtitle: string;
  subtitleP?: string;
  ventajas?: string[];
  ctas?: Array<{
    text: string;
    url?: string;
  }>;
}
