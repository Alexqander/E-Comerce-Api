import { Type } from '@sinclair/typebox';

export const RequestResetPasswordSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  phoneNumber: Type.String(),
  codeVerify: Type.String(),
  userId: Type.String({ format: 'uuid' }),
  createdAt: Type.String({ format: 'date-time' }),
  expiresAt: Type.String({ format: 'date-time' })
});
