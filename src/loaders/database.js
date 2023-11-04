import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export default async () => {
  try {
    await prisma.$connect();

    console.log('✅ Conexion a la base de datos exitosa ');
    await prisma.$disconnect();
  } catch (error) {
    console.log(' ❌❌ Error connecting to database', error);
    await prisma.$disconnect();
  }
};
