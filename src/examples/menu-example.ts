import type { MenuTemplateContent } from '../schemas/templates/menu';

/**
 * Ejemplo de contenido para el template Menu
 *
 * Este ejemplo muestra un menú navideño completo con:
 * - Secciones de menú (Lasañas, Pastelones, Ensaladas, etc.)
 * - Items con precios variables (pequeño/grande o precio único)
 * - Combos especiales con items incluidos
 * - Footer con información de contacto y CTAs
 */
export const menuExample: MenuTemplateContent = {
  imageUrl: 'https://via.placeholder.com/150', // URL de ejemplo
  headerTitle: 'La Cocina de Lucy',
  headerSubtitle: 'Menú Navideño 2025',
  headerText: 'SABOR Y TRADICIÓN',
  menuSectionTitle: 'Nuestro Menú',
  combosTitle: 'Combos Especiales',
  menuSections: [
    {
      title: 'Lasañas',
      items: [
        {
          name: 'Lasaña de Res',
          details: 'Con carne molida y salsa casera',
          priceSmall: 'RD$1,300',
          priceLarge: 'RD$2,000',
        },
        {
          name: 'Lasaña de Pollo',
          details: 'Con pollo desmenuzado',
          priceSmall: 'RD$1,500',
          priceLarge: 'RD$2,300',
        },
      ],
    },
    {
      title: 'Pastelones',
      items: [
        {
          name: 'Pastelón de Plátano Maduro',
          priceSmall: 'RD$1,200',
          priceLarge: 'RD$1,900',
        },
        {
          name: 'Pastelón de Papa',
          priceSmall: 'RD$1,000',
          priceLarge: 'RD$1,700',
        },
      ],
    },
    {
      title: 'Ensaladas',
      items: [
        {
          name: 'Ensalada Rusa',
          details: 'Blanca, roja o mixta',
          price: 'RD$800',
        },
        {
          name: 'Ensalada de Pasta',
          price: 'RD$800',
        },
      ],
    },
    {
      title: 'Arroces',
      items: [
        {
          name: 'Arroz Navideño con nueces',
          details: '5 lb',
          price: 'RD$900',
        },
        {
          name: 'Moro de Guandules',
          details: '5 lb',
          price: 'RD$750',
        },
      ],
    },
    {
      title: 'Carnes',
      items: [
        {
          name: 'Cerdo asado por libra',
          details: 'Mínimo 5 lb',
          price: 'RD$600',
        },
        {
          name: 'Pavo o Pollo en Salsa Ragú',
          details: 'Bandeja pequeña',
          price: 'RD$1,100',
        },
      ],
    },
    {
      title: 'Otros',
      items: [
        {
          name: 'Niños Envueltos',
          details: '12 unidades',
          price: 'RD$900',
        },
      ],
    },
  ],
  combos: [
    {
      name: 'Tradicional',
      price: 'RD$2,800',
      items: [
        'Lasaña de Res (pequeña)',
        'Ensalada Rusa',
        'Arroz Navideño (5 lb)',
      ],
    },
    {
      name: 'Cena Premium',
      price: 'RD$4,300',
      items: [
        'Lasaña de Pollo (pequeña)',
        'Ensalada de Pasta',
        'Moro de Guandules (5 lb)',
        '2 lb de Cerdo Asado',
      ],
    },
    {
      name: 'Familia Grande',
      price: 'RD$3,950',
      items: [
        'Lasaña de Res (grande)',
        'Ensalada Rusa',
        'Moro de Guandules (5 lb)',
        'Niños Envueltos (12u)',
      ],
    },
    {
      name: 'Navideño Especial',
      price: 'RD$5,000',
      items: [
        'Lasaña de Pollo (grande)',
        'Ensalada Rusa',
        'Arroz Navideño (5 lb)',
        'Pavo/Pollo en Salsa Ragú',
      ],
    },
    {
      name: 'Antojos Mixtos',
      price: 'RD$3,700',
      items: [
        'Pastelón de Plátano (pequeño)',
        'Pastelón de Papa (pequeño)',
        'Ensalada de Pasta',
        'Arroz Navideño (5 lb)',
      ],
    },
  ],
  footerTitle: 'Condiciones de Pedido',
  footerItems: [
    {
      title: '📞 Pedidos: ',
      titleStrong: '849-535-7777',
    },
    {
      title: '📅 Encargos con ',
      titleStrong: '48 horas de anticipación',
    },
    {
      title: '💰 Se requiere un ',
      titleStrong: '50% de adelanto',
    },
  ],
  footerCtaButtons: [
    {
      text: '📞 Llamar Ahora',
      href: 'tel:8495357777',
    },
    {
      text: '💬 WhatsApp',
      href: 'https://wa.me/18495357777',
    },
  ],
  footerText: '¡Haz de tu Navidad un momento especial con La Cocina de Lucy!',
};
