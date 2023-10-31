import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const registerOders = async () => {
  try {
    const orders = await prisma.orders.createMany({
      data: [
        {
          userId: '9e9ad194-2465-4b96-bf4e-68d60e656e6f',
          orderStatus: 'pending',
          orderedAt: new Date(),
          deliverDate: new Date()
        },
        {
          userId: '9e9ad194-2465-4b96-bf4e-68d60e656e6f',
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

// deleteUser('b8832d7a-8c33-4b02-a41f-f1260a28c3e4');
registerOders();
