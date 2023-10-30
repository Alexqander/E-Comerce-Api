import { PrismaClient } from '@prisma/client';
import { getMessage } from '../../helpers/Messages.js';
import config from '../../config/index.js';
import { tokenSign } from '../../helpers/generateToken.js';
import { asignSessionToken } from './session.service.js';

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

export const findUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id
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

export const signInUser = async (user) => {
  try {
    const tokenSession = await tokenSign(user.id, config.jwt.jwtExpire);

    const expiresAt = new Date();
    const tokenDurationHours = Number(
      process.env.JWT_EXPIRES_IN.replace('h', '')
    );
    expiresAt.setHours(expiresAt.getHours() + tokenDurationHours);
    const userSession = await asignSessionToken(
      user.id,
      tokenSession,
      expiresAt
    );
    const userWithoutPassword = { ...userSession };
    delete userWithoutPassword.password;
    return getMessage(
      false,
      { userWithoutPassword, token: userSession },
      'User session successfully obtained'
    );
  } catch (error) {
    return getMessage(true, error.message, 'Error creating session ');
  }
};

export const createUser = async (user, idRole, passwordHash) => {
  const { name, lastname, email } = user;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        lastName: lastname,
        email,
        password: passwordHash,
        roleId: idRole
      }
    });

    return getMessage(false, newUser, 'User created successfully');
  } catch (error) {
    console.log(error);
    return getMessage(true, error.message, 'Error creating user');
  }
};
export const createGoogleUser = async (user, passwordHash) => {
  const { name, lastname, email } = user;
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        lastName: lastname,
        email,
        password: passwordHash
      }
    });

    return getMessage(false, newUser, 'User created successfully');
  } catch (error) {
    console.log(error);
    return getMessage(true, error.message, 'Error creating user');
  }
};
