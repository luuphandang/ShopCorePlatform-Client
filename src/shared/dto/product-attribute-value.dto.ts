import { assignProductAttributeValueSchema, productAttributeValueSchema } from '../schema';
import { sanitizeFromZodSchema } from '../utils';

export const sanitizeProductAttributeValueSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(productAttributeValueSchema, data);

  return schema;
};

export const sanitizeAssignProductAttributeValueSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(assignProductAttributeValueSchema, data);

  return schema;
};
