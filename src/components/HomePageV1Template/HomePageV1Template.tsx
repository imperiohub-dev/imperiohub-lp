import type { HomePageV1Content } from '../../schemas/templates/home-page-v1';
import styles from './HomePageV1Template.module.scss';

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
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>{content.heroTitle}</h1>
        <p className={styles.heroSubtitle}>{content.heroSubtitle}</p>
        <a href={content.heroCtaUrl || '#'} className={styles.heroCta}>
          {content.heroCtaText}
        </a>
      </section>

      {/* Second Section */}
      <section className={styles.secondSection}>
        <h2 className={styles.sectionTitle}>{content.secondTitle}</h2>
        <p className={styles.sectionSubtitle}>{content.secondSubtitle}</p>

        {/* Navigation Blocks */}
        <div className={styles.navigationGrid}>
          {content.navigationBlocks.map((block, idx) => (
            <div key={idx} className={styles.navBlock}>
              <h3 className={styles.navBlockTitle}>{block.title}</h3>
              <p className={styles.navBlockSubtitle}>{block.subtitle}</p>
              <a href={block.linkUrl} className={styles.navBlockLink}>
                {block.linkText || 'Ver más →'}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
