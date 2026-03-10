import * as z from 'zod';

export const baseOrderShippingSchema = z.object({
  id: z.number().optional().nullable(),
  code: z.string().optional(),
  to_name: z.string().optional(),
  to_phone: z.string().optional(),
  to_email: z.string().optional(),
  to_address: z.string().optional(),
  to_ward: z.string().optional(),
  to_district: z.string().optional(),
  to_province: z.string().optional(),
  to_country: z.string().optional(),
  to_postal_code: z.string().optional(),
  to_latitude: z.number().optional(),
  to_longitude: z.number().optional(),
  note: z.string().optional(),
  pickup_at: z.date().optional(),
  delivery_at: z.date().optional(),
  return_at: z.date().optional(),
  cancel_at: z.date().optional(),
  completed_at: z.date().optional(),
  estimated_delivery_at: z.date().optional(),
  status: z.string().optional(),
});

export type TBaseOrderShippingSchema = z.infer<typeof baseOrderShippingSchema>;
