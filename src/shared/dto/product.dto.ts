import { EFileType } from '@/graphql/@types/graphql.type';
import { NO_IMAGE_URL } from '@/shared/constants/application';

import { productSchema } from '../schema';
import { sanitizeFromZodSchema } from '../utils';
import { sanitizeAssignConversionUnitSchema } from './conversion-unit.dto';
import { sanitizeAssignFileUploadSchema } from './file-upload.dto';
import { sanitizeAssignProductAttributeSchema } from './product-attribute.dto';
import { sanitizeAssignProductAttributeValueSchema } from './product-attribute-value.dto';
import { sanitizeAssignProductVariantSchema } from './product-variant.dto';

export const sanitizeProductSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(productSchema, data);

  const thumbnail = schema.thumbnail;
  schema.thumbnail = sanitizeAssignFileUploadSchema({
    ...thumbnail,
    name: thumbnail?.name || 'Ảnh đại diện',
    url: thumbnail?.url || NO_IMAGE_URL,
    type: thumbnail?.type || EFileType.Image,
  });

  if (Array.isArray(schema.variants)) {
    for (const i in schema.conversion_units) {
      schema.conversion_units[i] = sanitizeAssignConversionUnitSchema(schema.conversion_units[i]);
    }
  } else schema.conversion_units = [];

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

  if (Array.isArray(schema.variants)) {
    for (const i in schema.variants) {
      schema.variants[i] = sanitizeAssignProductVariantSchema(schema.variants[i]);
    }
  } else schema.variants = [];

  return schema;
};
