import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const registerOders = async () => {
  try {
    const orders = await prisma.orders.createMany({
      data: [
        {
          userId: 'cf7949ff-0e83-4fe3-8660-67dcfb22f4b0',
          orderStatus: 'pending',
          orderedAt: new Date(),
          deliverDate: new Date()
        },
        {
          userId: 'cf7949ff-0e83-4fe3-8660-67dcfb22f4b0',
          orderStatus: 'pending',
          orderedAt: new Date(),
          deliverDate: new Date()
        }
      ]
    });
    return orders;
  } catch (error) {
    console.log(error);
  }
};

registerOders();
