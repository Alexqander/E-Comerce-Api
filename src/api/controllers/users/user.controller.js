import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  asignRoleUser,
  findUserById,
  findUsers,
  modifiedUser,
  removeUser
} from '../../services/user.service.js';

export const getUsers = async (req, res) => {
  const users = await findUsers();

  if (users.error) {
    return getResponse500(users.data.message, res);
  } else {
    getResponse200(res, users.data, 'ok');
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);
  user.error
    ? getResponse500(user.data.message, res)
    : getResponse200(res, user.data, 'ok');
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await modifiedUser(id, req.body);
  user.error
    ? getResponse500(res, user.data.message, res)
    : getResponse200(res, user.data, 'ok');
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await removeUser(id);
  user.error
    ? getResponse500(user.data.message, res)
    : getResponse200(res, user.data, 'ok');
};

export const asignRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await asignRoleUser(id, role.id);
  user.error
    ? getResponse500(user.data.message, res)
    : getResponse200(res, user.data, 'ok');
};
