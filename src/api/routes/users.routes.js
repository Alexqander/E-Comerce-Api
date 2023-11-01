import { Router } from 'express';

import {
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from '../controllers/users/user.controller.js';
import { validateSchema } from '../middlewares/validations/validationSchemas.js';
import { UserSchema } from '../middlewares/validations/dtos/user.dto.js';
import { checkAuth, checkRoleAuth } from '../middlewares/auth/auth.js';
const router = Router();
// * /apiEcomerce/1.0/users/
router.get('/', checkAuth, checkRoleAuth(['ADMIN']), getUsers);
router.get(
  '/:id',
  checkAuth,
  checkRoleAuth(['USUARIO', 'VENDEDOR', 'REPARTIDOR']),
  getUser
);
router.put(
  '/:id',
  checkAuth,
  checkRoleAuth(['ADMIN', 'USUARIO', 'VENDEDOR', 'REPARTADOR']),
  validateSchema(UserSchema),
  updateUser
);
router.delete(
  '/:id',
  checkAuth,
  checkRoleAuth(['ADMIN', 'USUARIO', 'VENDEDOR', 'REPARTADOR']),
  deleteUser
);

export default router;
