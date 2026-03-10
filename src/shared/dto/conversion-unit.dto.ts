import { assignConversionUnitSchema, assignUnitSchema, conversionUnitSchema } from '../schema';
import { sanitizeFromZodSchema } from '../utils';

export const sanitizeConversionUnitSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(conversionUnitSchema, data);

  schema.unit = sanitizeFromZodSchema(assignUnitSchema, schema.unit);

  return schema;
};

export const sanitizeAssignConversionUnitSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(assignConversionUnitSchema, data);

  schema.unit = sanitizeFromZodSchema(assignUnitSchema, schema.unit);

  if (!schema.conversion_rate) schema.conversion_rate = 1;

  return schema;
};
