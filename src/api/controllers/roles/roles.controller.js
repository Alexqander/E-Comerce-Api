import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import { findRoles, saveRole } from '../../services/roles.service.js';

export const getRoles = async (req, res) => {
  const roles = await findRoles();
  roles.error
    ? getResponse500(res, roles)
    : getResponse200(res, roles.data, 'ok');
};

export const createRole = async (req, res) => {
  const roles = await saveRole(req.body);
  roles.error
    ? getResponse500(res, roles)
    : getResponse200(res, roles.data, 'ok');
};
