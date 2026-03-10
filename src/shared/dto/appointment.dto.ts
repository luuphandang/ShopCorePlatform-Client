import { appointmentSchema } from '../schema';
import { sanitizeFromZodSchema } from '../utils';

export const sanitizeAppointmentSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(appointmentSchema, data);

  return schema;
};
