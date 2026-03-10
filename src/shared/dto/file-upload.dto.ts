import { assignFileUploadSchema, fileUploadSchema } from '../schema';
import { sanitizeFromZodSchema } from '../utils';

export const sanitizeFileUploadSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(fileUploadSchema, data);

  return schema;
};

export const sanitizeAssignFileUploadSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(assignFileUploadSchema, data);

  return schema;
};
