import {
  getResponse200,
  getResponse201,
  getResponse401,
  getResponse404,
  getResponse500
} from '../../../helpers/Responses.js';
import {
  createUser,
  findUserByEmail,
  signInUser
} from '../../services/user.service.js';
import {
  asignSessionToken,
  clearAllSessionsByUser,
  deleteSession,
  findSessionByToken
} from '../../services/session.service.js';
import { compare, encrypt } from '../../../helpers/handleBcrypt.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUserByEmail(email);

  if (user.error) {
    return getResponse404(res);
  }
  const checkPassword = await compare(password, user.data.password);
  if (checkPassword) {
    const userSession = await asignSessionToken(user.data);
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
  const { user, role } = req.body;
  const { password } = user;
  const passwordHash = await encrypt(password);
  // creamos el usuario
  const newUser = await createUser(user, role, passwordHash);
  if (newUser.error) {
    console.log(newUser.error);
    return getResponse500(res, newUser.error);
  }
  // inicio sesion
  const newSignIn = await signInUser(newUser.data.user);
  if (newSignIn.error) {
    return getResponse500(res, {
      error: newSignIn.message,
      newUser: newSignIn.data
    });
  }
  return getResponse201(res, newSignIn.data, 'User createdAndLogged');
};

export const logoutUser = async (req, res) => {
  if (!req.headers.authorization) {
    return getResponse401(res);
  }
  const token = req.headers.authorization.split(' ').pop(); // ?asdsfsfsdhjfdshfsdfhskahuwe4

  const session = await findSessionByToken(token);
  const {
    error: clearSessionError,
    data: clearSessionData,
    message: clearSessionMessage
  } = await deleteSession(session.data.id);
  if (clearSessionError) {
    return getResponse500(res, {
      message: clearSessionMessage,
      data: clearSessionData
    });
  } else {
    return getResponse200(res, clearSessionData, 'Log out');
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
