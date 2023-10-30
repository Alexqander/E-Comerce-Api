import { Type } from '@sinclair/typebox';

export const OrdersSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  orderedAt: Type.String({ format: 'date-time' }),
  deliverDate: Type.String({ format: 'date-time' }),
  orderStatus: Type.String(),
  userId: Type.String({ format: 'uuid' })
  // El campo 'OrderDetails' se omite por simplicidad
});
