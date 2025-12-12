/**
 * Exporta todos los templates disponibles
 */

export * from './menu';
export * from './hero-beneficios';
export * from './home-page-v1';

import { menuTemplate } from './menu';
import { heroConBeneficiosTemplate } from './hero-beneficios';
import { homePageV1Template } from './home-page-v1';
import type { LandingPageTemplate } from '../types';

/**
 * Array con todos los templates disponibles
 * Útil para iterar sobre todos los templates (ej: en seeds del backend)
 */
export const allTemplates: LandingPageTemplate[] = [
  menuTemplate,
  heroConBeneficiosTemplate,
  homePageV1Template,
];

/**
 * Mapa de templates por slug
 * Útil para obtener un template específico por su slug
 */
export const templatesBySlug: Record<string, LandingPageTemplate> = {
  [menuTemplate.slug]: menuTemplate,
  [heroConBeneficiosTemplate.slug]: heroConBeneficiosTemplate,
  [homePageV1Template.slug]: homePageV1Template,
};
