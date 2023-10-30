import { Type } from '@sinclair/typebox';

export const RolesSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' })
  // El campo 'users' se omite por simplicidad
});
