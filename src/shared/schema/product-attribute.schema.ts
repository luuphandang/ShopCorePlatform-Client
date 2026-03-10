import * as z from 'zod';

export const baseProductAttributeSchema = z.object({
  id: z.number().optional(),
  code: z.string().optional(),
  name: z.string().min(1, {
    message: 'Tên thuộc tính không được để trống',
  }),
});
export type TBaseProductAttributeSchema = z.infer<typeof baseProductAttributeSchema>;
