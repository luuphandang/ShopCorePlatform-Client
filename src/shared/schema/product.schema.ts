import * as z from 'zod';

import { EProductStatus, EProductType } from '@/graphql/@types/graphql.type';

export const baseProductSchema = z.object({
  id: z.number().optional(),
  code: z.string().optional(),
  name: z.string().min(1, {
    message: 'Tên sản phẩm không được để trống',
  }),
  sku: z.string().optional(),
  type: z.nativeEnum(EProductType).optional(),
  features: z.array(z.string()).optional(),
  turnaround: z.string().optional(),
  short_description: z.string().optional(),
  description: z.string().optional(),
  status: z.nativeEnum(EProductStatus).optional(),
});
export type TBaseProductSchema = z.infer<typeof baseProductSchema>;
