import * as z from 'zod';

import { EProductStatus } from '@/graphql/@types/graphql.type';

export const baseProductVariantSchema = z.object({
  id: z.number().optional(),
  code: z.string().optional(),
  name: z.string().min(1, {
    message: 'Tên phiên bản không được để trống',
  }),
  sku: z.string().min(1, {
    message: 'Tên phiên bản không được để trống',
  }),
  status: z.nativeEnum(EProductStatus),
  description: z.string().optional().nullable(),
});
export type TBaseProductVariantSchema = z.infer<typeof baseProductVariantSchema>;
