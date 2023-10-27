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

export const signInUser = async (email) => {
  try {
    const signedUser = await prisma.user.update({
      where: {
        email
      },
      data: {
        sessions: {
          create: {
            token
          }
        }
      }
    });
    return getMessage(false, signedUser, 'User created successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating user');
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

//* Funcion que guarda el token sesion del usuario en la base de datos
export const asignSessionToken = async (id, token, expiresAt) => {
  try {
    /* const sessionUser = await Session.create({
      token,
      userId: id,
      expiresAt,
    }); */
    return getMessage(false, sessionUser.toJSON(), 'ok');
  } catch (error) {
    console.log(error);
    return getMessage(true, error, 'error');
  }
};
