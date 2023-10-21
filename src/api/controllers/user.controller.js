import { getResponse200, getResponse500 } from '../../helpers/Responses.js';
import { findUsers } from '../services/user.service.js';

export const getUsers = async (req, res) => {
  const users = await findUsers();
  if (users.error) {
    return getResponse500(users.data.message, res);
  } else {
    getResponse200(res, users, 'ok');
  }
};
