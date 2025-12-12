import type { HomePageV1Content } from '../schemas/templates/home-page-v1';

export interface HomePageV1TemplateProps {
  content: HomePageV1Content;
}

/**
 * Componente HomePageV1Template
 *
 * PLACEHOLDER: Este es un componente básico para que Git guarde el archivo.
 * Se reemplazará con el diseño real más adelante.
 *
 * @param props.content - El contenido validado del template home-page-v1
 */
export function HomePageV1Template({ content }: HomePageV1TemplateProps) {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '80px 20px',
          textAlign: 'center',
          backgroundColor: '#f8f9fa',
        }}
      >
        <h1 style={{ fontSize: '56px', marginBottom: '24px' }}>
          {content.heroTitle}
        </h1>
        <p
          style={{
            fontSize: '24px',
            marginBottom: '32px',
            maxWidth: '800px',
            margin: '0 auto 32px',
          }}
        >
          {content.heroSubtitle}
        </p>
        <a
          href={content.heroCtaUrl || '#'}
          style={{
            display: 'inline-block',
            padding: '16px 32px',
            backgroundColor: '#007bff',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          {content.heroCtaText}
        </a>
      </section>

      {/* Second Section */}
      <section
        style={{
          padding: '60px 20px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '40px', marginBottom: '16px' }}>
          {content.secondTitle}
        </h2>
        <p style={{ fontSize: '20px', marginBottom: '48px', color: '#6c757d' }}>
          {content.secondSubtitle}
        </p>

        {/* Navigation Blocks */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {content.navigationBlocks.map((block, idx) => (
            <div
              key={idx}
              style={{
                padding: '32px',
                backgroundColor: '#fff',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                textAlign: 'left',
              }}
            >
              <h3 style={{ fontSize: '28px', marginBottom: '12px' }}>
                {block.title}
              </h3>
              <p style={{ fontSize: '16px', marginBottom: '16px', color: '#6c757d' }}>
                {block.subtitle}
              </p>
              <a
                href={block.linkUrl}
                style={{
                  color: '#007bff',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                {block.linkText || 'Ver más →'}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
