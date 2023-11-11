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
