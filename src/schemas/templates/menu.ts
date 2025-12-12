import type { LandingPageTemplate } from '../types';

/**
 * Template: Menu
 *
 * Template para menús de restaurante con secciones, items y combos.
 * Ideal para menús navideños o especiales con estructura compleja.
 */
export const menuTemplate: LandingPageTemplate = {
  name: 'Menú de comida',
  slug: 'menu',
  schema: {
    fields: [
      {
        name: 'headerTitle',
        label: 'Título del encabezado',
        type: 'string',
        required: true,
      },
      {
        name: 'headerSubtitle',
        label: 'Subtítulo del encabezado',
        type: 'string',
        required: true,
      },
      {
        name: 'headerText',
        label: 'Texto del encabezado',
        type: 'string',
        required: true,
      },
      {
        name: 'menuSectionTitle',
        label: 'Título de la sección de menú',
        type: 'string',
        required: true,
      },
      {
        name: 'combosTitle',
        label: 'Título de la sección de combos',
        type: 'string',
        required: true,
      },
      {
        name: 'menuSections',
        label: 'Secciones del Menú',
        type: 'array_object',
        required: true,
        objectFields: [
          {
            name: 'title',
            label: 'Título de sección',
            type: 'string',
            required: true,
          },
          {
            name: 'items',
            label: 'Items de la sección',
            type: 'array_object',
            required: true,
            objectFields: [
              {
                name: 'name',
                label: 'Nombre del plato',
                type: 'string',
                required: true,
              },
              {
                name: 'details',
                label: 'Detalles del plato',
                type: 'string',
                required: false,
              },
              {
                name: 'priceSmall',
                label: 'Precio pequeño',
                type: 'string',
                required: false,
              },
              {
                name: 'priceLarge',
                label: 'Precio grande',
                type: 'string',
                required: false,
              },
              {
                name: 'price',
                label: 'Precio',
                type: 'string',
                required: false,
              },
            ],
          },
        ],
      },
      {
        name: 'combos',
        label: 'Combos',
        type: 'array_object',
        required: false,
        objectFields: [
          {
            name: 'name',
            label: 'Nombre del combo',
            type: 'string',
            required: true,
          },
          {
            name: 'price',
            label: 'Precio del combo',
            type: 'string',
            required: true,
          },
          {
            name: 'items',
            label: 'Items del combo',
            type: 'array_string',
            required: true,
          },
        ],
      },
      {
        name: 'footerTitle',
        label: 'Título del footer',
        type: 'string',
        required: true,
      },
      {
        name: 'footerItems',
        label: 'Items del footer',
        type: 'array_object',
        required: true,
        objectFields: [
          {
            name: 'title',
            label: 'Título',
            type: 'string',
            required: true,
          },
          {
            name: 'titleStrong',
            label: 'Título destacado',
            type: 'string',
            required: true,
          },
        ],
      },
      {
        name: 'footerCtaButtons',
        label: 'Botones de acción del footer',
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
            label: 'URL o acción',
            type: 'string',
            required: true,
          },
        ],
      },
      {
        name: 'footerText',
        label: 'Texto del footer',
        type: 'string',
        required: true,
      },
    ],
  },
};

/**
 * TypeScript types para el content del template Menu
 * Estos tipos se generan automáticamente basándose en el schema
 */

export interface MenuItem {
  name: string;
  details?: string;
  priceSmall?: string;
  priceLarge?: string;
  price?: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface Combo {
  name: string;
  price: string;
  items: string[];
}

export interface FooterItem {
  title: string;
  titleStrong: string;
}

export interface CTAButton {
  text: string;
  href: string;
}

export interface MenuTemplateContent {
  headerTitle: string;
  headerSubtitle: string;
  headerText: string;
  menuSectionTitle: string;
  combosTitle: string;
  menuSections: MenuSection[];
  combos?: Combo[];
  footerTitle: string;
  footerItems: FooterItem[];
  footerCtaButtons: CTAButton[];
  footerText: string;
}
