import { Type } from '@sinclair/typebox';

export const OrderDetailsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  quantity: Type.Integer(),
  orderId: Type.String({ format: 'uuid' }),
  productId: Type.String({ format: 'uuid' })
});
