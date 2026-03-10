import * as z from 'zod';

export const baseUnitSchema = z.object({
  id: z.number().optional(),
  code: z.string().optional(),
  name: z.string().min(1, {
    message: 'Tên đơn vị tính không được để trống',
  }),
  description: z.string().optional(),
});
export type TBaseUnitSchema = z.infer<typeof baseUnitSchema>;
