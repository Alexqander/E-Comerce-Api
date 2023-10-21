import { getResponse200 } from '../../helpers/Responses.js';
export const sigIn = async (req, res) => {
  return getResponse200(res, req.user, 'login');
};
