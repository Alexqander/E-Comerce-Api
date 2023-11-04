import { Type } from '@sinclair/typebox';

export const SellerProfileSchema = Type.Object({
  storeName: Type.String(),
  userId: Type.String({ format: 'uuid' })
});
