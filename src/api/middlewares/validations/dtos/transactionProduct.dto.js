import { Type } from '@sinclair/typebox';

export const TransactionsProductsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  createdAt: Type.String({ format: 'date-time' }),
  transactionId: Type.String({ format: 'uuid' }),
  productId: Type.String({ format: 'uuid' }),
  quantity: Type.Integer()
});
