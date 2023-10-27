import { getResponse401, getResponse403 } from '../../../helpers/Responses.js';
import { verifyToken } from '../../../helpers/generateToken.js';
import { getUserById } from '../../../Entities/Usuario/service/Users.services.js';

export const checkAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return getResponse401(res);
    }
    // * Check authorization Bearer asdsfsfsdhjfdshfsdfhskahuwe4
    const token = req.headers.authorization.split(' ').pop(); // ?asdsfsfsdhjfdshfsdfhskahuwe4
    const tokenData = await verifyToken(token);
    console.log('verfificando el token');
    console.log(tokenData);
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
    const userData = await getUserById(tokenData.id);

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
