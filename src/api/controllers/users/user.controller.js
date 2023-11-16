import { handleUpload } from '../../../config/cloudinary.js';
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

export const updateProfilePicture = async (req, res) => {
  const { id } = req.params;
  const file = req.files;
  if (!file) return getResponse500(res, 'No se ha subido ningún archivo');

  const b64 = Buffer.from(file.buffer).toString('base64');
  const dataUri = 'data:' + file.mimetype + ';base64,' + b64;
  const uploadResult = await handleUpload(dataUri);

  const imageUrl = uploadResult.url;
  const profilePicture = await modifiedUser(id, { profilePicture: imageUrl });
  profilePicture.error
    ? getResponse500(profilePicture.data.message, res)
    : getResponse200(res, profilePicture.data, 'ok');
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
