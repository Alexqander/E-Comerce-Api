import { Type } from '@sinclair/typebox';

export const ProductSchema = Type.Object({
  name: Type.String(),
  price: Type.Number(),
  description: Type.String(),
  stock: Type.Integer(),
  storeId: Type.String({ format: 'uuid' }),
  subCategoryId: Type.Number()
  // ... otros campos relacionales no se incluyen por simplicidad
});
