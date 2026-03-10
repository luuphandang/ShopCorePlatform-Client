import { assignProductAttributeSchema, productAttributeSchema } from '../schema';
import { sanitizeFromZodSchema } from '../utils';
import { sanitizeAssignProductAttributeValueSchema } from './product-attribute-value.dto';

export const sanitizeProductAttributeSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(productAttributeSchema, data);

  if (Array.isArray(schema.values)) {
    for (const i in schema.values) {
      schema.values[i] = sanitizeAssignProductAttributeValueSchema(schema.values[i]);
    }
  } else schema.values = [];

  return schema;
};

export const sanitizeAssignProductAttributeSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(assignProductAttributeSchema, data);

  if (Array.isArray(schema.values)) {
    for (const i in schema.values) {
      schema.values[i] = sanitizeAssignProductAttributeValueSchema(schema.values[i]);
    }
  } else schema.values = [];

  return schema;
};
