import type { HeroConBeneficiosContent } from '../../schemas/templates/hero-beneficios';
import styles from './HeroBeneficiosTemplate.module.scss';

export interface HeroBeneficiosTemplateProps {
  content: HeroConBeneficiosContent;
}

/**
 * Componente HeroBeneficiosTemplate
 * Landing page con hero, sección de asesoría y lista de ventajas
 *
 * @param props.content - El contenido validado del template hero-beneficios
 */
export function HeroBeneficiosTemplate({
  content,
}: HeroBeneficiosTemplateProps) {
  return (
    <div className={styles.landing_page}>
      {/* Hero Section */}
      <section className={styles.landing_page__hero}>
        <h1 className={styles.landing_page__title}>{content.title}</h1>
        <p className={styles.landing_page__title_paragraph}>{content.titleP}</p>
      </section>

      {/* Asesoría Section */}
      <section className={styles.landing_page__asesoria}>
        <h2 className={styles.landing_page__subtitle}>{content.subtitle}</h2>
        {content.subtitleP && (
          <p className={styles.landing_page__subtitle_paragraph}>
            {content.subtitleP}
          </p>
        )}
      </section>

      {/* Ventajas Section */}
      {content.ventajas && content.ventajas.length > 0 && (
        <section className={styles.landing_page__ventajas}>
          {content.ventajas.map((ventaja, idx) => (
            <div key={idx} className={styles.landing_page__ventaja_item}>
              <p>{ventaja}</p>
            </div>
          ))}
        </section>
      )}

      {/* CTA Button */}
      {content.ctas && content.ctas.length > 0 && content.ctas[0] && (
        <a
          href={content.ctas[0].url || '#'}
          className={styles.landing_page__cta}
        >
          {content.ctas[0].text}
        </a>
      )}
    </div>
  );
}
