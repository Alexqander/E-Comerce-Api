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
        { name: 'Electrónicos' },
        { name: 'Moda' },
        { name: 'Hogar y Cocina' },
        { name: 'Salud y Belleza' },
        { name: 'Deportes y Aire Libre' },
        { name: 'Juguetes y Juegos' }
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
          name: 'Audio y Equipos de Sonido',
          categoryId: 1,
          description: 'Audífonos, altavoces, sistemas de sonido y más.'
        },

        {
          name: 'Ropa para Hombres',
          categoryId: 2,
          description: 'Camisas, pantalones, trajes y ropa casual para hombres.'
        },
        {
          name: 'Ropa para Mujeres',
          categoryId: 2,
          description: 'Vestidos, blusas, pantalones y moda femenina.'
        },
        {
          name: 'Calzado',
          categoryId: 2,
          description: 'Zapatos, botas, sandalias y más para todos.'
        },
        {
          name: 'Accesorios',
          categoryId: 2,
          description: 'Bolsos, relojes, joyería y otros accesorios.'
        },

        {
          name: 'Muebles',
          categoryId: 3,
          description: 'Muebles para sala, comedor, dormitorio y más.'
        },
        {
          name: 'Electrodomésticos',
          categoryId: 3,
          description: 'Refrigeradores, microondas, lavadoras y otros aparatos.'
        },
        {
          name: 'Decoración',
          categoryId: 3,
          description: 'Artículos decorativos para el hogar y la oficina.'
        },

        {
          name: 'Maquillaje',
          categoryId: 4,
          description: 'Productos de maquillaje para rostro, ojos y labios.'
        },
        {
          name: 'Cuidado del Cabello',
          categoryId: 4,
          description: 'Shampoos, acondicionadores, tratamientos y más.'
        },
        {
          name: 'Productos para la Piel',
          categoryId: 4,
          description:
            'Cremas, lociones, protectores solares y cuidado de la piel.'
        },

        {
          name: 'Ropa y Calzado Deportivo',
          categoryId: 5,
          description:
            'Ropa y calzado para deportes y actividades al aire libre.'
        },
        {
          name: 'Equipo de Entrenamiento',
          categoryId: 5,
          description: 'Pesas, bandas de resistencia y equipo de gimnasio.'
        },
        {
          name: 'Accesorios para Deportes',
          categoryId: 5,
          description: 'Balones, raquetas y otros accesorios deportivos.'
        },

        {
          name: 'Juguetes Educativos',
          categoryId: 6,
          description: 'Juguetes que promueven el aprendizaje y desarrollo.'
        },
        {
          name: 'Juegos de Mesa',
          categoryId: 6,
          description: 'Juegos para disfrutar en familia o con amigos.'
        },
        {
          name: 'Juguetes para Bebés',
          categoryId: 6,
          description: 'Juguetes seguros y divertidos para los más pequeños.'
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
