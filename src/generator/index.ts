import type { PrismaClient } from '@prisma/client';
import type { LandingPageTemplate } from '../schemas/types';
import { validateTemplate } from '../schemas/validators';

/**
 * Generador de Landing Page Templates para Prisma
 *
 * Esta función crea o actualiza un template en la base de datos
 * con validación estricta del tipado del schema.
 *
 * @param template - Template a crear/actualizar
 * @param prisma - Instancia de PrismaClient
 * @returns El template creado/actualizado
 *
 * @example
 * ```ts
 * import { PrismaClient } from '@prisma/client';
 * import { createLandingPageTemplate, menuTemplate } from '@imperiohub/lp-templates/generator';
 *
 * const prisma = new PrismaClient();
 *
 * const template = await createLandingPageTemplate(menuTemplate, prisma);
 * ```
 */
export async function createLandingPageTemplate(
  template: LandingPageTemplate,
  prisma: PrismaClient
) {
  console.log(`🔍 Validando template: ${template.name}...`);

  // Validar el template antes de insertarlo
  try {
    validateTemplate(template);
  } catch (error) {
    console.error(
      `❌ Error de validación en template "${template.name}":`,
      error
    );
    throw error;
  }

  console.log(`✅ Validación exitosa para: ${template.name}`);
  console.log(`💾 Insertando template en la base de datos...`);

  try {
    const createdTemplate = await prisma.landingPageTemplate.upsert({
      where: { slug: template.slug },
      update: {
        name: template.name,
        schema: template.schema as any, // Prisma maneja JSON
      },
      create: {
        name: template.name,
        slug: template.slug,
        schema: template.schema as any, // Prisma maneja JSON
      },
    });

    console.log(
      `✅ Template "${template.name}" creado/actualizado exitosamente`
    );
    console.log(`   ID: ${createdTemplate.id}`);
    console.log(`   Slug: ${createdTemplate.slug}`);
    console.log(`   Campos: ${template.schema.fields.length}`);
    console.log('');

    return createdTemplate;
  } catch (error) {
    console.error(`❌ Error al insertar template "${template.name}":`, error);
    throw error;
  }
}

/**
 * Inicializa múltiples templates de una vez
 *
 * @param templates - Array de templates a crear
 * @param prisma - Instancia de PrismaClient
 *
 * @example
 * ```ts
 * import { PrismaClient } from '@prisma/client';
 * import { initializeTemplates, allTemplates } from '@imperiohub/lp-templates/generator';
 *
 * const prisma = new PrismaClient();
 *
 * // En seeds/templates.ts
 * await initializeTemplates(allTemplates, prisma);
 * ```
 */
export async function initializeTemplates(
  templates: LandingPageTemplate[],
  prisma: PrismaClient
): Promise<void> {
  console.log(
    `\n📋 Iniciando inserción de ${templates.length} template(s)...\n`
  );

  let successCount = 0;
  let errorCount = 0;

  for (const template of templates) {
    try {
      await createLandingPageTemplate(template, prisma);
      successCount++;
    } catch (error) {
      errorCount++;
      console.error(`❌ Falló la inserción del template "${template.name}"\n`);
    }
  }

  console.log('━'.repeat(60));
  console.log(`✅ Templates insertados exitosamente: ${successCount}`);
  if (errorCount > 0) {
    console.log(`❌ Templates con errores: ${errorCount}`);
  }
  console.log('━'.repeat(60));
  console.log('');
}
