import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import { findRoles, saveRole } from '../../services/roles.service.js';

export const getRoles = async (req, res) => {
  // const onjeto = await accionARealizarenElservice();
  const roles = await findRoles();
  // con el message que devuelve el servicio
  // evaluamos si hay error o no y retorno la respuesta
  roles.error
    ? getResponse500(res, roles) // getResponse500(response, error);
    : getResponse200(res, roles.data, 'ok'); // getResponse200(response, data, message);
};

export const createRole = async (req, res) => {
  const roles = await saveRole(req.body);
  roles.error
    ? getResponse500(res, roles)
    : getResponse200(res, roles.data, 'ok');
};
