import { orderSchema, TOrderSchema } from '../schema';
import { sanitizeFromZodSchema } from '../utils';

export const sanitizeOrderSchema = (data: unknown): TOrderSchema => {
  const sanitizedData = sanitizeFromZodSchema(orderSchema, data);

  return sanitizedData;
};
