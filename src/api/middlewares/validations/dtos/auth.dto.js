import { Type } from '@sinclair/typebox';
import { UserRegisterSchema } from './user.dto.js';

export const LoginSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 4 })
});

export const registerSchema = Type.Object({
  user: UserRegisterSchema,
  role: Type.Number()
});
