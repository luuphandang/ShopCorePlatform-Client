import * as z from 'zod';

import { EFileStatus, EFileType } from '@/graphql/@types/graphql.type';

export const baseFileUploadSchema = z.object({
  id: z.number().optional(),
  code: z.string().optional(),
  name: z.string().min(1, {
    message: 'Tên file không được để trống',
  }),
  url: z.string().min(1, {
    message: 'Đường dẫn file không được để trống',
  }),
  type: z.nativeEnum(EFileType).refine((val) => !!val, {
    message: 'Loại file không được để trống',
  }),
  size: z.number().optional(),
  status: z.nativeEnum(EFileStatus).optional(),
});
export type TBaseFileUploadSchema = z.infer<typeof baseFileUploadSchema>;
