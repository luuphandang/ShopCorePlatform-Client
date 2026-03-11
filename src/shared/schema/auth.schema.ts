import * as z from 'zod';

export const baseSignInSchema = z.object({
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 ký tự'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});
export type TBaseSignInSchema = z.infer<typeof baseSignInSchema>;

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const passwordMessage = 'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt';

export const baseSignUpSchema = z.object({
  phone: z.string().min(10, 'Số điện thoại phải có ít nhất 10 ký tự'),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự').regex(passwordRegex, passwordMessage),
  confirm_password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  last_name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự'),
});
export type TBaseSignUpSchema = z.infer<typeof baseSignUpSchema>;
