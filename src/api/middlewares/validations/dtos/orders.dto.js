import { Type } from '@sinclair/typebox';

export const OrdersSchema = Type.Object({
  orderedAt: Type.String({ format: 'date-time' }),
  deliverDate: Type.String({ format: 'date-time' }),
  orderStatus: Type.String(),
  userId: Type.String({ format: 'uuid' })
  // El campo 'OrderDetails' se omite por simplicidad
});
export const OrderUpdateSchema = Type.Object({
  deliverDate: Type.Optional(Type.String({ format: 'date-time' })),
  orderStatus: Type.String()
});
