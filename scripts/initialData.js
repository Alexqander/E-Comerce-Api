import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$transaction([
    prisma.roles.createMany({
      data: [
        {
          name: 'ADMIN'
        },
        {
          name: 'VENDEDOR'
        },
        {
          name: 'REPARTIDOR'
        },
        {
          name: 'USER'
        }
      ]
    }),
    prisma.category.createMany({
      data: [
        { name: 'Electrónicos' }, // 1
        { name: 'Moda' }, // 2
        { name: 'Hogar y Cocina' }, // 3
        { name: 'Salud y Belleza' }, // 4
        { name: 'Deportes y Aire Libre' }, // 5
        { name: 'Juguetes y Juegos' } // 6
      ]
    }),
    prisma.subCategory.createMany({
      data: [
        {
          name: 'Teléfonos y Accesorios',
          categoryId: 1,
          description: 'Smartphones, estuches, cargadores y más.'
        },
        {
          name: 'Computadoras y Accesorios',
          categoryId: 1,
          description:
            'Laptops, desktops, periféricos y accesorios relacionados.'
        },
        {
          name: 'Ropa para Hombre',
          categoryId: 2,
          description: 'Camisas, pantalones, jeans, trajes y más.'
        },
        {
          name: 'Ropa para Mujer',
          categoryId: 2,
          description: 'Camisas, Vestidos, jeans, blusas y más.'
        },
        {
          name: 'Linea Blanca',
          categoryId: 3,
          description: 'Refrigeradoras, lavadoras, cocinas y más.'
        },
        {
          name: 'Productos de Cocina',
          categoryId: 3,
          description: 'Ollas, sartenes, cubiertos y más.'
        },
        {
          name: 'Productos de limpieza',
          categoryId: 3,
          description: 'Detergentes, jabones, desinfectantes y más.'
        },
        {
          name: 'Cuidado Personal',
          categoryId: 4,
          description: 'Cremas, jabones, desodorantes y más.'
        },
        {
          name: 'Fragancias para Mujer',
          categoryId: 4,
          description: 'Perfumes, colonias y más.'
        },
        {
          name: 'Fragancias para Hombre',
          categoryId: 4,
          description: 'Perfumes, colonias y más.'
        },
        {
          name: 'Accesorios deportivos',
          categoryId: 5,
          description: 'Balones, raquetas, guantes y más.'
        },
        {
          name: 'Ropa deportiva',
          categoryId: 5,
          description: 'Camisetas, shorts, sudaderas y más.'
        },
        {
          name: 'Juguetes para Niños',
          categoryId: 6,
          description: 'Muñecas, carros, peluches y más.'
        },
        {
          name: 'Videojuegos y Consolas',
          categoryId: 6,
          description: 'Playstation, Xbox, Nintendo y más.'
        }
      ]
    })
  ]);
  return result;
}
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
