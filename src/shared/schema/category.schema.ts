import * as z from 'zod';

import { ECategoryType } from '@/graphql/@types/graphql.type';

export const baseCategorySchema = z.object({
  id: z.number().optional(),
  code: z.string().optional(),
  name: z.string().min(1, {
    message: 'Tên danh mục không được để trống',
  }),
  type: z.nativeEnum(ECategoryType).refine((val) => !!val, {
    message: 'Loại danh mục không được để trống',
  }),
  description: z.string().optional(),
});
export type TBaseCategorySchema = z.infer<typeof baseCategorySchema>;
