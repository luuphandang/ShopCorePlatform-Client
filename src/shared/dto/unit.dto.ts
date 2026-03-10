import { assignUnitSchema, unitSchema } from '../schema';
import { sanitizeFromZodSchema } from '../utils';

export const sanitizeUnitSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(unitSchema, data);

  return schema;
};

export const sanitizeAssignUnitSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(assignUnitSchema, data);

  return schema;
};
