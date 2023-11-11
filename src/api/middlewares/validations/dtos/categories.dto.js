import { Type } from '@sinclair/typebox';

export const CategoriesSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  description: Type.String(),
  subcategories: Type.Array(
    Type.Object({
      id: Type.String({ format: 'uuid' }),
      name: Type.String(),
      description: Type.String(),
      categoryId: Type.String({ format: 'uuid' })
    })
  )
});
export const CategoriesSchemaCreate = Type.Object({
  name: Type.String(),
  description: Type.String()
});

export const CategoriesSchemaUpdate = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String(),
  description: Type.String()
});

export const SubCategorySchemaCreate = Type.Object({
  name: Type.String(),
  description: Type.String(),
  categoryId: Type.Number()
});
