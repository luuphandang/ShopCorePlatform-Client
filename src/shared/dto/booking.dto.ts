import { bookingSchema } from '../schema';
import { sanitizeFromZodSchema } from '../utils';

export const sanitizeBookingSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(bookingSchema, data);

  return schema;
};
