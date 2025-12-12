import type { HeroConBeneficiosContent } from '../schemas/templates/hero-beneficios';

export interface HeroBeneficiosTemplateProps {
  content: HeroConBeneficiosContent;
}

/**
 * Componente HeroBeneficiosTemplate
 *
 * PLACEHOLDER: Este es un componente básico para que Git guarde el archivo.
 * Se reemplazará con el diseño real más adelante.
 *
 * @param props.content - El contenido validado del template hero-beneficios
 */
export function HeroBeneficiosTemplate({
  content,
}: HeroBeneficiosTemplateProps) {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      {/* Hero Section */}
      <section style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>
          {content.title}
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '32px' }}>
          {content.titleP}
        </p>

        <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>
          {content.subtitle}
        </h2>
        {content.subtitleP && (
          <p style={{ fontSize: '18px', marginBottom: '32px' }}>
            {content.subtitleP}
          </p>
        )}
      </section>

      {/* Ventajas */}
      {content.ventajas && content.ventajas.length > 0 && (
        <section style={{ marginBottom: '40px' }}>
          <h3>Ventajas</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {content.ventajas.map((ventaja, idx) => (
              <li
                key={idx}
                style={{
                  padding: '10px',
                  marginBottom: '8px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                }}
              >
                ✓ {ventaja}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* CTAs */}
      {content.ctas && content.ctas.length > 0 && (
        <section style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            {content.ctas.map((cta, idx) => (
              <a
                key={idx}
                href={cta.url || '#'}
                style={{
                  display: 'inline-block',
                  padding: '12px 24px',
                  backgroundColor: idx === 0 ? '#007bff' : '#6c757d',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                }}
              >
                {cta.text}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
