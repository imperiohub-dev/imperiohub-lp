import { z } from 'zod';
import {
  SchemaFieldSchema,
  LandingPageTemplateSchema,
  type SchemaField,
  type LandingPageTemplate,
} from '../types';

/**
 * Valida que un SchemaField cumpla con las reglas de negocio
 * @param field - Campo a validar
 * @param depth - Nivel de anidación (0 = raíz, 1 = primer nivel, etc.)
 * @throws {z.ZodError} Si el campo no es válido
 */
export function validateSchemaField(field: SchemaField, depth: number = 0): void {
  // Validación base con Zod
  SchemaFieldSchema.parse(field);

  // Límite de anidación: máximo 2 niveles de array_object
  const maxDepth = 2;

  if (field.type === 'array_object' && field.objectFields) {
    field.objectFields.forEach((subField) => {
      if (subField.type === 'array_object' && depth >= maxDepth) {
        throw new Error(
          `Campo "${field.name}.${subField.name}" excede el límite de anidación (máximo ${maxDepth} niveles de array_object)`
        );
      }
      validateSchemaField(subField, depth + 1);
    });
  }
}

/**
 * Valida que un LandingPageTemplate sea correcto
 * @param template - Template a validar
 * @throws {z.ZodError} Si el template no es válido
 */
export function validateTemplate(template: LandingPageTemplate): void {
  // Validación base con Zod
  LandingPageTemplateSchema.parse(template);

  // Validar cada campo con reglas de anidación
  template.schema.fields.forEach((field) => validateSchemaField(field));
}

/**
 * Valida el content de una landing page contra el schema del template
 *
 * Esta función genera dinámicamente un schema de Zod basado en el template
 * y valida que el content cumpla con la estructura esperada.
 *
 * @param content - El contenido a validar (JSON)
 * @param template - El template que define la estructura esperada
 * @returns El content validado y tipado
 * @throws {z.ZodError} Si el content no cumple con el schema
 */
export function validateContent<T = unknown>(
  content: unknown,
  template: LandingPageTemplate
): T {
  const contentSchema = generateContentSchema(template.schema.fields);
  return contentSchema.parse(content) as T;
}

/**
 * Genera un schema de Zod dinámicamente basado en los campos del template
 *
 * @param fields - Array de SchemaField del template
 * @returns Schema de Zod para validar el content
 */
function generateContentSchema(fields: SchemaField[]): z.ZodObject<any> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case 'string':
        fieldSchema = z.string();
        break;

      case 'array_string':
        fieldSchema = z.array(z.string());
        break;

      case 'array_object':
        if (!field.objectFields || field.objectFields.length === 0) {
          throw new Error(
            `Campo "${field.name}" es array_object pero no tiene objectFields`
          );
        }
        fieldSchema = z.array(generateContentSchema(field.objectFields));
        break;

      default:
        throw new Error(`Tipo de campo desconocido: ${field.type}`);
    }

    // Si el campo no es requerido, hacerlo opcional
    shape[field.name] = field.required ? fieldSchema : fieldSchema.optional();
  }

  return z.object(shape);
}

/**
 * Valida el content de forma segura sin lanzar errores
 *
 * @param content - El contenido a validar
 * @param template - El template que define la estructura
 * @returns Objeto con { success: boolean, data?: T, error?: z.ZodError }
 */
export function safeValidateContent<T = unknown>(
  content: unknown,
  template: LandingPageTemplate
): { success: true; data: T } | { success: false; error: z.ZodError } {
  try {
    const data = validateContent<T>(content, template);
    return { success: true, data };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error };
    }
    throw error;
  }
}
