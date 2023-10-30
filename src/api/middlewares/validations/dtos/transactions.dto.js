import { Type } from '@sinclair/typebox';

export const TransactionsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  createdAt: Type.String({ format: 'date-time' }),
  userId: Type.String({ format: 'uuid' }),
  totalAmount: Type.Number()
  // El campo 'TransactionsProducts' se omite por simplicidad
});
