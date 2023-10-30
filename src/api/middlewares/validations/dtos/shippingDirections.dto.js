import { Type } from '@sinclair/typebox';

export const ShippingDirectionsSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  street: Type.String(),
  interiorNumber: Type.String(),
  exteriorNumber: Type.String(),
  city: Type.String(),
  state: Type.String(),
  postalCode: Type.String(),
  country: Type.String(),
  createdAt: Type.String({ format: 'date-time' }),
  updatedAt: Type.String({ format: 'date-time' }),
  userId: Type.String({ format: 'uuid' })
});
