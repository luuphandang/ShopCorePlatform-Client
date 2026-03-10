import * as z from 'zod';

export const baseProductAttributeValueSchema = z.object({
  id: z.number().optional(),
  attribute_id: z.number().positive({
    message: 'Thuộc tính không được để trống',
  }),
  value: z.string().min(1, {
    message: 'Giá trị không được để trống',
  }),
});
export type TBaseProductAttributeValueSchema = z.infer<typeof baseProductAttributeValueSchema>;
