import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn']
});

export default async () => {
  try {
    await prisma.$connect();
    console.log('✅ Conexion a la base de datos exitosa ');
  } catch (error) {
    console.log(' ❌❌ Error connecting to database', error);
    await prisma.$disconnect();
  }
};
