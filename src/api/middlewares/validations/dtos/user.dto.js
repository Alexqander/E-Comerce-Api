import { Type } from '@sinclair/typebox';

export const UserSchema = Type.Object({
  email: Type.Optional(String()),
  phoneNumber: Type.Optional(Type.String()),
  name: Type.Optional(Type.String()),
  lastName: Type.Optional(Type.String()),
  roleId: Type.Optional(Type.Integer())
});
export const UserRegisterSchema = Type.Object({
  email: Type.String({ format: 'email' }),
  phoneNumber: Type.String({ minLength: 10 }),
  name: Type.String({ minLength: 3 }),
  lastName: Type.String({ minLength: 3 })
});
