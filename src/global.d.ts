/**
 * Type declarations for CSS/SCSS modules
 */
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

/**
 * Declare optional peer dependencies
 * Para evitar errores de TypeScript cuando no están instaladas
 */
declare module '@prisma/client' {
  export interface PrismaClient {
    landingPageTemplate: any;
    [key: string]: any;
  }
}
