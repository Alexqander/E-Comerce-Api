import { Type } from '@sinclair/typebox';

export const ShoppingCartSchema = Type.Object({
  id: Type.Optional(Type.String()), // ID es opcional ya que se genera automáticamente
  quantity: Type.Integer(),
  orderStatus: Type.String(),
  // Campos `createdAt` y `updatedAt` no incluidos ya que se manejan automáticamente
  buyerId: Type.String()
  // `products` no se incluye en el schema si es una relación y no un campo directo
  // Si necesitas incluir los productos, tendrás que definir cómo se representa esa relación
});

export const cartItemSchema = Type.Object({
  id: Type.Optional(Type.String()), // ID es opcional ya que se genera automáticamente
  quantity: Type.Integer(),
  // Campos `createdAt` y `updatedAt` no incluidos ya que se manejan automáticamente
  productId: Type.String()
});

export const ArrayCartItemSchema = Type.Object({
  products: Type.Array(cartItemSchema)
});

export const newShoppingCartSchema = Type.Object({
  orderStatus: Type.String(),
  buyerId: Type.String(),
  products: Type.Array(cartItemSchema)
});
