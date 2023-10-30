import { Type } from '@sinclair/typebox';

export const ProductSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  price: Type.Number(),
  description: Type.String(),
  stock: Type.Integer(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
  categoryId: Type.Integer()
  // ... otros campos relacionales no se incluyen por simplicidad
});
