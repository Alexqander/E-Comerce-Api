import { PrismaClient } from '@prisma/client';
import { getMessage } from '../../helpers/Messages.js';

const prisma = new PrismaClient();

export const findUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return getMessage(false, users, 'Data successfully obtained');
  } catch (error) {
    return getMessage(true, error.message, 'Error al obtener los usuarios');
  }
};

export const findUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    }); // * SELECT * FROM user WHERE email = email [{},{}]
    // * null * undefined

    return user
      ? getMessage(false, user, 'Data successfully obtained')
      : getMessage(true, user, 'User not exists');
  } catch (error) {
    return getMessage(true, error.message, 'User not exists');
  }
};

export const createUser = async (user) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        ...user
      }
    });

    return getMessage(false, newUser, 'User created successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating user');
  }
};
