import { z } from 'zod';

/**
 * Tipos permitidos para los campos del schema de templates
 */
export const FieldTypeSchema = z.enum(['string', 'array_string', 'array_object']);
export type FieldType = z.infer<typeof FieldTypeSchema>;

/**
 * Definición recursiva de un campo del schema
 *
 * Soporta hasta 2 niveles de anidación de array_object
 */
export const SchemaFieldSchema: z.ZodType<SchemaField> = z.lazy(() =>
  z.object({
    /** Clave del campo (nombre de la propiedad en el JSON de content) */
    name: z.string().min(1, 'El nombre del campo no puede estar vacío'),

    /** Etiqueta legible para mostrar al usuario */
    label: z.string().min(1, 'El label del campo no puede estar vacío'),

    /** Tipo de dato permitido */
    type: FieldTypeSchema,

    /** Indica si el campo es obligatorio */
    required: z.boolean(),

    /** Sub-campos solo cuando type es 'array_object' */
    objectFields: z.array(SchemaFieldSchema).optional(),
  }).refine(
    (field) => {
      // Si es array_object, debe tener objectFields
      if (field.type === 'array_object') {
        return field.objectFields && field.objectFields.length > 0;
      }
      // Si NO es array_object, no debe tener objectFields
      return !field.objectFields;
    },
    {
      message: 'array_object debe tener objectFields, otros tipos no deben tenerlo',
    }
  )
);

export type SchemaField = {
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  objectFields?: SchemaField[];
};

/**
 * Schema del template que define la estructura de campos
 */
export const TemplateSchemaSchema = z.object({
  fields: z
    .array(SchemaFieldSchema)
    .min(1, 'El template debe tener al menos un campo')
    .refine(
      (fields) => {
        // Validar que no haya nombres duplicados
        const names = fields.map((f) => f.name);
        return names.length === new Set(names).size;
      },
      {
        message: 'No puede haber campos con nombres duplicados',
      }
    ),
});

export type TemplateSchema = z.infer<typeof TemplateSchemaSchema>;

/**
 * Definición completa de un Landing Page Template
 */
export const LandingPageTemplateSchema = z.object({
  /** Nombre descriptivo del template */
  name: z.string().min(1, 'El nombre del template no puede estar vacío'),

  /** Slug único para identificar el template (formato kebab-case) */
  slug: z
    .string()
    .min(1, 'El slug no puede estar vacío')
    .regex(
      /^[a-z0-9]+(-[a-z0-9]+)*$/,
      'El slug debe estar en formato kebab-case (ej: "hero-beneficios")'
    ),

  /** Schema que define los campos requeridos */
  schema: TemplateSchemaSchema,
});

export type LandingPageTemplate = z.infer<typeof LandingPageTemplateSchema>;
