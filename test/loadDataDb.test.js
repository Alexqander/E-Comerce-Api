import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
/* const registerOders = async () => {
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

const findSessionByToken = async (token) => {
  try {
    const session = await prisma.sessions.findFirst({
      where: {
        token
      }
    });
    console.log(session);
    return session ? 'sesion existe' : 'sesion no existe';
  } catch (error) {
    return error;
  }
};

const session = await findSessionByToken(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg2ZTA4ODczLWVkM2MtNDY4Yy04ZjM5LTYyM2UwMDg3NWQwYSIsImlhdCI6MTY5ODkwMjQ5MiwiZXhwIjoxNjk5MjYyNDkyfQ.jRjn-sNFlORQxZp5uT9ulOYljPgWuWRLBR_Zxxk_-EA'
); */

async function loadInitialData() {
  // load roles
  const roles = await prisma.roles.createMany({
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
  });
  // load userAdmin
  const userAdmin = await prisma.user.create({
    data: {
      name: 'admin',
      lastName: 'admin',
      email: 'adminalexander@gmail.com',
      password: 'alexander123',
      roleId: 1
    }
  });

  return { roles, userAdmin };
}
loadInitialData();
