import * as z from 'zod';

export const baseOrderDetailSchema = z.object({
  id: z.number().optional().nullable(),
  code: z.string().optional(),
  quantity: z.number().optional(),
  price: z.number().optional(),
  total_cost: z.number().optional(),
  service_fee: z.number().optional(),
  tax: z.number().optional(),
  discount: z.number().optional(),
  final_cost: z.number().optional(),
  status: z.string().optional(),
  shipping_status: z.string().optional(),
  payment_status: z.string().optional(),
  note: z.string().optional(),
});

export type TBaseOrderDetailSchema = z.infer<typeof baseOrderDetailSchema>;
