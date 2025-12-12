import type { HomePageV1Content } from '../schemas/templates/home-page-v1';

/**
 * Ejemplo de contenido para el template Home Page V1
 *
 * Este ejemplo muestra una home page completa con:
 * - Hero section con título, subtítulo y CTA
 * - Segunda sección con título y subtítulo
 * - 3 bloques de navegación (Servicios, Blog, Agendar Cita)
 */
export const homePageV1Example: HomePageV1Content = {
  // === HERO SECTION ===
  heroTitle: '¡Bienvenido a ImperioHub!',
  heroSubtitle:
    'Crea landing pages profesionales en minutos. Sin código, sin complicaciones.',
  heroCtaText: 'Comenzar ahora',
  heroCtaUrl: '/signup',

  // === SECOND SECTION ===
  secondTitle: 'Todo lo que necesitas para crecer',
  secondSubtitle:
    'Explora nuestras herramientas y recursos para llevar tu negocio al siguiente nivel',

  // === 3 BLOQUES DE NAVEGACIÓN ===
  navigationBlocks: [
    {
      title: 'Servicios',
      subtitle: 'Descubre todas las soluciones que ofrecemos para tu negocio',
      linkUrl: '/servicios',
      linkText: 'Ver servicios',
    },
    {
      title: 'Blog',
      subtitle: 'Lee artículos y guías para mejorar tu presencia digital',
      linkUrl: '/blog',
      linkText: 'Ir al blog',
    },
    {
      title: 'Agendar Cita',
      subtitle: 'Reserva una consultoría personalizada con nuestro equipo',
      linkUrl: '/agendar-cita',
      linkText: 'Agendar ahora',
    },
  ],
};
