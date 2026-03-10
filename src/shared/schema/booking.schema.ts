import * as z from 'zod';

import { EBookingType } from '@/graphql/@types/graphql.type';

export const baseBookingSchema = z.object({
  id: z.number().optional(),
  code: z.string().optional(),
  name: z.string().min(1, { message: 'Tên khách hàng không được để trống' }),
  phone: z.string().min(1, { message: 'Số điện thoại không được để trống' }),
  email: z.string().email({ message: 'Email không hợp lệ' }).optional(),
  category_ids: z.array(z.number()).optional(),
  product_ids: z.array(z.number()).optional(),
  attachment_ids: z.array(z.number()).optional(),
  estimated_date: z.date().optional(),
  estimated_time: z.string().optional(),
  content: z.string().min(1, { message: 'Nội dung không được để trống' }),
  type: z.nativeEnum(EBookingType),
});
export type TBaseBookingSchema = z.infer<typeof baseBookingSchema>;
