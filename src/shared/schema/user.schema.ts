import * as z from 'zod';

export const baseUserSchema = z.object({
  id: z.number().optional(),
  code: z.string().optional(),
  phone: z.string().refine((val) => !!val, {
    message: 'Số điện thoại không được để trống',
  }),
  password: z.string().refine((val) => !!val, {
    message: 'Mật khẩu không được để trống',
  }),
  first_name: z.string().optional(),
  last_name: z.string().refine((val) => !!val, {
    message: 'Tên người dùng không được để trống',
  }),
  email: z.string().optional(),
  address: z.string().optional(),
  birthday: z.string().optional(),
});
export type TBaseUserSchema = z.infer<typeof baseUserSchema>;
