import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const tokenSign = async (user, expiresIn) => {
  // ? Genera token
  return jwt.sign(
    {
      id: user.id, // ? Payload
      roles: user.Roles
    },
    config.jwt.jwtSecret, // ? Clave secreta
    {
      expiresIn // ? Tiempo de expiracion
    }
  );
};

export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const decodeSign = (token) => {};
