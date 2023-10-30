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

const findUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
    include: {
      role: true
    }
  });
  console.log(user);
  return user;
};

const deleteUser = async (id) => {
  const deletedUser = await prisma.user.delete({
    where: {
      id
    }
  });
  console.log(deletedUser);
  return deletedUser;
};

deleteUser('b8832d7a-8c33-4b02-a41f-f1260a28c3e4');
