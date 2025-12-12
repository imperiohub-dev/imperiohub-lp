/**
 * @imperiohub/lp-templates
 *
 * Paquete centralizado de templates para landing pages del ecosistema ImperioHub SaaS.
 *
 * Este paquete exporta:
 * - Tipos y schemas de templates (compartidos por todos los repos)
 * - Validadores con Zod (backend los usa antes de guardar)
 * - Templates disponibles (backend los inserta, admin los lista)
 * - Componentes React (solo cliente los usa para renderizar)
 * - Utilidades para backend (generador de templates en DB)
 * - Ejemplos de contenido (para testing y desarrollo)
 *
 * @example
 * ```ts
 * // En saas-back (backend):
 * import { allTemplates, createLandingPageTemplate } from '@imperiohub/lp-templates/generator';
 * import { validateContent } from '@imperiohub/lp-templates';
 *
 * // En saas-admin (panel de administración):
 * import { menuTemplate, type MenuTemplateContent } from '@imperiohub/lp-templates/schemas';
 *
 * // En saas-cliente (frontend público):
 * import { TemplateRenderer } from '@imperiohub/lp-templates/components';
 * ```
 */

// ===== SCHEMAS =====
// Tipos, templates y validadores
export * from './schemas';

// ===== COMPONENTS =====
// Componentes React para renderizar templates
export * from './components';

// ===== RENDERER =====
// TemplateRenderer principal
export * from './renderer';

// ===== EXAMPLES =====
// Ejemplos de contenido para cada template
export * from './examples';

// ===== GENERATOR =====
// Utilidades para backend (opcional, mejor usar el export dedicado)
// export * from './generator'; // NO exportar aquí para evitar dependencia de Prisma en todos los contextos

export const version = '0.1.0';
