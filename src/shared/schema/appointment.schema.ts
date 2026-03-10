import * as z from 'zod';

import { EAppointmentStatus } from '@/graphql/@types/graphql.type';

export const baseAppointmentSchema = z.object({
  id: z.number().optional(),
  code: z.string().optional(),
  customer_id: z.number().optional(),
  name: z.string().min(1, {
    message: 'Tên khách hàng không được để trống',
  }),
  phone: z.string().min(1, {
    message: 'Số điện thoại không được để trống',
  }),
  email: z.string().optional(),
  title: z.string().min(1, {
    message: 'Tiêu đề không được để trống',
  }),
  content: z.string().min(1, {
    message: 'Nội dung không được để trống',
  }),
  status: z.nativeEnum(EAppointmentStatus).optional(),
  attachment_ids: z.array(z.number()).optional(),
});
export type TBaseAppointmentSchema = z.infer<typeof baseAppointmentSchema>;
