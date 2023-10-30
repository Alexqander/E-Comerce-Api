import {
  getResponse200,
  getResponse201,
  getResponse401,
  getResponse403,
  getResponse404,
  getResponse500
} from '../../../helpers/Responses.js';
import { tokenSign, verifyToken } from '../../../helpers/generateToken.js';
import {
  createUser,
  findUserByEmail,
  findUserById
} from '../../services/user.service.js';
import {
  asignSessionToken,
  clearAllSessionsByUser,
  deleteSession,
  findSessionByToken
} from '../../services/session.service.js';
import { compare, encrypt } from '../../../helpers/handleBcrypt.js';
import config from '../../../config/index.js';

export const sigIn = async (req, res) => {
  return getResponse200(res, req.user, 'login');
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);
  if (!user.data) {
    return getResponse404(res);
  }
  const checkPassword = await compare(password, user.data.password);
  if (checkPassword) {
    const tokenSession = await tokenSign(user.data, config.jwt.jwtExpire);
    // ? Convierte la duración del token a una fecha de expiración
    const expiresAt = new Date();
    const tokenDurationHours = Number(
      process.env.JWT_EXPIRES_IN.replace('h', '')
    );
    expiresAt.setHours(expiresAt.getHours() + tokenDurationHours);

    const userSession = await asignSessionToken(
      user.data.id,
      tokenSession,
      expiresAt
    );

    const userWithoutPassword = { ...user.data };
    delete userWithoutPassword.password;
    return getResponse200(
      res,
      { ...userWithoutPassword, token: userSession.data },
      'Loggin'
    );
  } else {
    return getResponse404(res, 'Password incorrect');
  }
};

export const registerUser = async (req, res) => {
  console.log('Entre al register');
  console.log(req.body);
  const { user, role } = req.body;
  const { password } = user;
  const passwordHash = await encrypt(password);
  const newUser = await createUser(user, role, passwordHash);
  if (newUser.error) {
    console.log(newUser.error);
    return getResponse500(res, newUser.error);
  } else {
    return getResponse201(res, newUser.data, 'created');
  }
};

export const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return getResponse401(res);
    }
    // * Check authorization Bearer asdsfsfsdhjfdshfsdfhskahuwe4
    const token = req.headers.authorization.split(' ').pop(); // ?asdsfsfsdhjfdshfsdfhskahuwe4
    const tokenData = await verifyToken(token);

    if (!tokenData) {
      return getResponse401(res);
    }
    if (tokenData.id) {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return getResponse401(res);
    }
    // * Check authorization Bearer asdsfsfsdhjfdshfsdfhskahuwe4
    const token = req.headers.authorization.split(' ').pop(); // ?asdsfsfsdhjfdshfsdfhskahuwe4
    const tokenData = await verifyToken(token);
    const userData = await findUserById(tokenData.id);

    // ? Comprueba si el usuario tiene algún rol permitido|
    const userHasAllowedRole = userData.data.Roles.some((role) =>
      roles.includes(role.nombre)
    );
    if (userHasAllowedRole) {
      next();
    } else {
      return getResponse403(res);
    }
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async (req, res) => {
  if (!req.headers.authorization) {
    return getResponse401(res);
  }
  const token = req.headers.authorization.split(' ').pop(); // ?asdsfsfsdhjfdshfsdfhskahuwe4

  const session = await findSessionByToken(token);
  console.log(session);
  const clearUserSession = await deleteSession(session.data.id);
  if (clearUserSession.error) {
    return getResponse500(res, clearUserSession.message);
  } else {
    return getResponse200(res, clearUserSession.data, 'Log out');
  }
};

export const logOutAllUserSessions = async (req, res) => {
  const { id } = req.params;
  const clearUserSession = await clearAllSessionsByUser(id);
  if (clearUserSession.error) {
    return getResponse500(res, clearUserSession.message);
  } else {
    return getResponse200(res, clearUserSession.data, 'clear all sessions');
  }
};
