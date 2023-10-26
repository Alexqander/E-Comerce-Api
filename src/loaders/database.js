import { PrismaClient } from '@prisma/client';

const databasePrismaClient = new PrismaClient();

export default async () => {
  try {
    await databasePrismaClient.$connect();
    console.log('✅ Conexion a la base de datos exitosa ');
    await databasePrismaClient.$disconnect();
  } catch (error) {
    console.log(' ❌❌ Error connecting to database', error);
    await databasePrismaClient.$disconnect();
  }
};
