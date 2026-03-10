import { signInSchema, signUpSchema } from '../schema';
import { sanitizeFromZodSchema } from '../utils';

export const sanitizeSignInSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(signInSchema, data);

  return schema;
};

export const sanitizeSignUpSchema = (data: unknown) => {
  const schema = sanitizeFromZodSchema(signUpSchema, data);

  return schema;
};
