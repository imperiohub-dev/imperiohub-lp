import type { HeroConBeneficiosContent } from '../schemas/templates/hero-beneficios';

/**
 * Ejemplo de contenido para el template Hero con Beneficios
 *
 * Este objeto sigue la estructura definida en el schema
 */
export const heroConBeneficiosExample: HeroConBeneficiosContent = {
  title: 'Construyo tu web profesional',
  titleP: 'Diseño premium, rápido y enfocado en conversiones.',
  subtitle: 'Asesoría personalizada',
  subtitleP: 'Te guío paso a paso para lograr tu proyecto.',
  ventajas: ['Entrega rápida', 'Arquitectura moderna', 'Diseño responsivo'],
  ctas: [
    {
      text: 'Contactar por WhatsApp',
      url: 'whatsapp',
    },
    {
      text: 'Ver más información',
      url: '#servicios',
    },
  ],
};
