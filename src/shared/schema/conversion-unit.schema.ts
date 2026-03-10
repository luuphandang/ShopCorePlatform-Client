import * as z from 'zod';

export const baseConversionUnitSchema = z.object({
  id: z.number().optional(),
  code: z.string().optional(),
  unit_id: z.number().positive({
    message: 'Đơn vị quy đổi không được để trống',
  }),
  conversion_rate: z.number().positive({
    message: 'Tỷ lệ quy đổi không được để trống',
  }),
  regular_price: z.number().positive({
    message: 'Giá niêm yết không được để trống',
  }),
  sale_price: z.number().positive({
    message: 'Giá khuyến mãi không được để trống',
  }),
  price: z.number().positive({
    message: 'Giá không được để trống',
  }),
  description: z.string().optional(),
});
export type TBaseConversionUnitSchema = z.infer<typeof baseConversionUnitSchema>;
