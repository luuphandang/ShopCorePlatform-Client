import * as z from 'zod';

export const baseOrderSchema = z.object({
  id: z.number().optional().nullable(),
  code: z.string().optional(),
  total_cost: z.number().optional(),
  service_fee: z.number().optional(),
  tax: z.number().optional(),
  discount: z.number().optional(),
  final_cost: z.number().optional(),
  paid: z.number().optional(),
  remaining: z.number().optional(),
  status: z.string().optional(),
  shipping_status: z.string().optional(),
  payment_status: z.string().optional(),
  note: z.string().optional(),
});
export type TBaseOrderSchema = z.infer<typeof baseOrderSchema>;

export const baseOrderFilterSchema = z.object({
  code: z.string().min(6, {
    message: 'Mã đơn hàng phải có ít nhất 6 ký tự.',
  }),
});
