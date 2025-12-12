import type { MenuTemplateContent } from '../schemas/templates/menu';

export interface MenuTemplateProps {
  content: MenuTemplateContent;
}

/**
 * Componente MenuTemplate
 *
 * PLACEHOLDER: Este es un componente básico para que Git guarde el archivo.
 * Se reemplazará con el diseño real más adelante.
 *
 * @param props.content - El contenido validado del template menu
 */
export function MenuTemplate({ content }: MenuTemplateProps) {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>{content.headerTitle}</h1>
        <h2>{content.headerSubtitle}</h2>
        <p>{content.headerText}</p>
      </header>

      {/* Menu Sections */}
      <section style={{ marginBottom: '40px' }}>
        <h2>{content.menuSectionTitle}</h2>
        {content.menuSections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: '30px' }}>
            <h3>{section.title}</h3>
            <ul>
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx}>
                  <strong>{item.name}</strong>
                  {item.details && <span> - {item.details}</span>}
                  <br />
                  {item.price && <span>Precio: {item.price}</span>}
                  {item.priceSmall && (
                    <span>Pequeño: {item.priceSmall}</span>
                  )}
                  {item.priceLarge && (
                    <span> | Grande: {item.priceLarge}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Combos */}
      {content.combos && content.combos.length > 0 && (
        <section style={{ marginBottom: '40px' }}>
          <h2>{content.combosTitle}</h2>
          {content.combos.map((combo, idx) => (
            <div key={idx} style={{ marginBottom: '20px' }}>
              <h3>
                {combo.name} - {combo.price}
              </h3>
              <ul>
                {combo.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Footer */}
      <footer style={{ marginTop: '40px', textAlign: 'center' }}>
        <h2>{content.footerTitle}</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {content.footerItems.map((item, idx) => (
            <li key={idx}>
              {item.title}
              <strong>{item.titleStrong}</strong>
            </li>
          ))}
        </ul>
        <div style={{ marginTop: '20px' }}>
          {content.footerCtaButtons.map((button, idx) => (
            <a
              key={idx}
              href={button.href}
              style={{
                display: 'inline-block',
                margin: '0 10px',
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
              }}
            >
              {button.text}
            </a>
          ))}
        </div>
        <p style={{ marginTop: '20px' }}>{content.footerText}</p>
      </footer>
    </div>
  );
}
