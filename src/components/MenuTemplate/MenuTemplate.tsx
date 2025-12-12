import type { MenuTemplateContent } from '../../schemas/templates/menu';
import styles from './MenuTemplate.module.scss';

export interface MenuTemplateProps {
  content: MenuTemplateContent;
  imageUrl?: string;
}

/**
 * Componente MenuTemplate
 *
 * Template para menús de restaurante con diseño navideño elegante.
 * Incluye secciones de menú, items con precios y combos especiales.
 *
 * @param props.content - El contenido validado del template menu
 * @param props.imageUrl - URL opcional del logo/imagen del restaurante
 */
export function MenuTemplate({ content, imageUrl }: MenuTemplateProps) {
  const {
    headerTitle,
    headerSubtitle,
    headerText,
    menuSectionTitle,
    combosTitle,
    menuSections,
    combos,
    footerTitle,
    footerItems,
    footerCtaButtons,
    footerText,
  } = content;

  return (
    <div className={styles['christmas-menu-v2']}>
      <div className={styles['christmas-menu-v2__container']}>
        {/* Header */}
        <header className={styles['christmas-menu-v2__header']}>
          {imageUrl && (
            <div className={styles['christmas-menu-v2__logo-wrapper']}>
              <img
                src={imageUrl}
                alt={headerTitle}
                className={styles['christmas-menu-v2__logo']}
              />
            </div>
          )}
          <h1 className={styles['christmas-menu-v2__title']}>{headerTitle}</h1>
          <h2 className={styles['christmas-menu-v2__subtitle']}>
            {headerSubtitle}
          </h2>
          <p className={styles['christmas-menu-v2__tagline']}>{headerText}</p>
        </header>

        {/* Menu Sections */}
        <main className={styles['christmas-menu-v2__content']}>
          <section className={styles['christmas-menu-v2__section']}>
            <h3 className={styles['christmas-menu-v2__section-title']}>
              {menuSectionTitle}
            </h3>

            {menuSections.map((section, index) => (
              <div key={index} className={styles['christmas-menu-v2__category']}>
                <h4 className={styles['christmas-menu-v2__category-title']}>
                  {section.title}
                </h4>

                <div className={styles['christmas-menu-v2__items']}>
                  {section.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={styles['christmas-menu-v2__item']}
                    >
                      <div className={styles['christmas-menu-v2__item-info']}>
                        <h5 className={styles['christmas-menu-v2__item-name']}>
                          {item.name}
                        </h5>
                        {item.details && (
                          <p
                            className={styles['christmas-menu-v2__item-details']}
                          >
                            {item.details}
                          </p>
                        )}
                      </div>
                      <div className={styles['christmas-menu-v2__item-price']}>
                        {item.priceSmall && item.priceLarge ? (
                          <div
                            className={
                              styles['christmas-menu-v2__item-price-group']
                            }
                          >
                            <span
                              className={styles['christmas-menu-v2__price-option']}
                            >
                              <span
                                className={
                                  styles['christmas-menu-v2__price-label']
                                }
                              >
                                Pequeña:
                              </span>
                              <span
                                className={
                                  styles['christmas-menu-v2__price-value']
                                }
                              >
                                {item.priceSmall}
                              </span>
                            </span>
                            <span
                              className={
                                styles['christmas-menu-v2__price-divider']
                              }
                            >
                              |
                            </span>
                            <span
                              className={styles['christmas-menu-v2__price-option']}
                            >
                              <span
                                className={
                                  styles['christmas-menu-v2__price-label']
                                }
                              >
                                Grande:
                              </span>
                              <span
                                className={
                                  styles['christmas-menu-v2__price-value']
                                }
                              >
                                {item.priceLarge}
                              </span>
                            </span>
                          </div>
                        ) : (
                          <span
                            className={styles['christmas-menu-v2__price-single']}
                          >
                            {item.price}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>

          {/* Combos Section */}
          {combos && combos.length > 0 && (
            <section
              className={`${styles['christmas-menu-v2__section']} ${styles['christmas-menu-v2__section--combos']}`}
            >
              <h3 className={styles['christmas-menu-v2__section-title']}>
                {combosTitle}
              </h3>

              <div className={styles['christmas-menu-v2__combos']}>
                {combos.map((combo, index) => (
                  <div key={index} className={styles['christmas-menu-v2__combo']}>
                    <div className={styles['christmas-menu-v2__combo-header']}>
                      <h4 className={styles['christmas-menu-v2__combo-name']}>
                        {combo.name}
                      </h4>
                      <span className={styles['christmas-menu-v2__combo-price']}>
                        {combo.price}
                      </span>
                    </div>
                    <ul className={styles['christmas-menu-v2__combo-items']}>
                      {combo.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className={styles['christmas-menu-v2__combo-item']}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className={styles['christmas-menu-v2__footer']}>
          <h3 className={styles['christmas-menu-v2__footer-title']}>
            {footerTitle}
          </h3>
          <div className={styles['christmas-menu-v2__footer-divider']}></div>

          <div className={styles['christmas-menu-v2__footer-info']}>
            {footerItems.map((item, index) => (
              <p key={index} className={styles['christmas-menu-v2__footer-text']}>
                {item.title}
                <span className={styles['christmas-menu-v2__footer-highlight']}>
                  {item.titleStrong}
                </span>
              </p>
            ))}
          </div>

          {/* CTAs dinámicos */}
          {footerCtaButtons.length > 0 && (
            <div className={styles['christmas-menu-v2__footer-cta']}>
              {footerCtaButtons.map((button, index) => (
                <a
                  key={index}
                  href={button.href}
                  className={`${styles['christmas-menu-v2__cta-button']} ${
                    index === 0
                      ? styles['christmas-menu-v2__cta-button--primary']
                      : styles['christmas-menu-v2__cta-button--secondary']
                  }`}
                >
                  {button.text}
                </a>
              ))}
            </div>
          )}

          <div className={styles['christmas-menu-v2__footer-divider']}></div>

          <p className={styles['christmas-menu-v2__footer-message']}>
            {footerText}
          </p>
        </footer>
      </div>
    </div>
  );
}
