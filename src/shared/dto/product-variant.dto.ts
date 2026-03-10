import {
  assignProductVariantSchema,
  productVariantSchema,
  TAssignProductVariantSchema,
} from '../schema';
import { sanitizeFromZodSchema } from '../utils';
import { sanitizeAssignProductAttributeSchema } from './product-attribute.dto';
import { sanitizeAssignProductAttributeValueSchema } from './product-attribute-value.dto';

export const sanitizeProductVariantSchema = (data: unknown): TAssignProductVariantSchema => {
  const schema = sanitizeFromZodSchema(productVariantSchema, data);

  if (Array.isArray(schema.attributes)) {
    for (const i in schema.attributes) {
      schema.attributes[i] = sanitizeAssignProductAttributeSchema(schema.attributes[i]);
    }
  } else schema.attributes = [];

  if (Array.isArray(schema.values)) {
    for (const i in schema.values) {
      schema.values[i] = sanitizeAssignProductAttributeValueSchema(schema.values[i]);
    }
  } else schema.values = [];

  return schema;
};

export const sanitizeAssignProductVariantSchema = (data: unknown): TAssignProductVariantSchema => {
  const schema = sanitizeFromZodSchema(assignProductVariantSchema, data);

  if (Array.isArray(schema.attributes)) {
    for (const i in schema.attributes) {
      schema.attributes[i] = sanitizeAssignProductAttributeSchema(schema.attributes[i]);
    }
  } else schema.attributes = [];

  if (Array.isArray(schema.values)) {
    for (const i in schema.values) {
      schema.values[i] = sanitizeAssignProductAttributeValueSchema(schema.values[i]);
    }
  } else schema.values = [];

  return schema;
};
