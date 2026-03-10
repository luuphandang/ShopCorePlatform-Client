import {
  assignCategorySchema,
  categorySchema,
  TAssignCategorySchema,
  TCategorySchema,
} from '../schema';
import { sanitizeFromZodSchema } from '../utils';

export const sanitizeCategorySchema = (data: unknown): TCategorySchema => {
  const schema = sanitizeFromZodSchema(categorySchema, data);

  return schema;
};

export const sanitizeAssignCategorySchema = (data: unknown): TAssignCategorySchema => {
  const schema = sanitizeFromZodSchema(assignCategorySchema, data);

  return schema;
};
