import { PrismaClient } from '@prisma/client';
import { getMessage } from '../../helpers/Messages.js';

const prisma = new PrismaClient();
export const findSessionByToken = async (token) => {
  try {
    const session = await prisma.sessions.findFirst({
      where: {
        token
      }
    });
    return session
      ? getMessage(false, session, 'Data successfully obtained')
      : getMessage(true, session, 'Session not exists');
  } catch (error) {
    return getMessage(true, error.message, 'Session not exists');
  }
};
//* Funcion que guarda el token sesion del usuario en la base de datos
export const asignSessionToken = async (id, token, expiresAt) => {
  try {
    const tokenUser = await prisma.sessions.create({
      data: {
        token,
        expiresAt,
        userId: id
      }
    });

    return getMessage(false, tokenUser, 'ok');
  } catch (error) {
    console.log(error);
    return getMessage(true, error, 'error');
  }
};
export const deleteSession = async (id) => {
  try {
    const session = await prisma.sessions.delete({
      where: {
        id
      }
    });
    return session
      ? getMessage(false, session, 'Session successfully deleted')
      : getMessage(true, session, 'Session not exists');
  } catch (error) {
    return getMessage(true, error.message, 'Session not exists');
  }
};
export const clearAllSessionsByUser = async (userId) => {
  try {
    const sessions = await prisma.sessions.deleteMany({
      where: {
        userId
      }
    });
    return sessions
      ? getMessage(false, sessions, 'Sessions successfully deleted')
      : getMessage(true, sessions, 'Sessions not exists');
  } catch (error) {
    return getMessage(true, error.message, 'Sessions not exists');
  }
};
