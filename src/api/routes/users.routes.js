import { Router } from 'express';

import {
  deleteUser,
  getUser,
  getUsers,
  updateProfilePicture,
  updateUser
} from '../controllers/users/user.controller.js';
import { validateSchema } from '../middlewares/validations/validationSchemas.js';
import { UserSchema } from '../middlewares/validations/dtos/user.dto.js';
import { checkAuth, checkRoleAuth } from '../middlewares/auth/auth.js';
import multer from 'multer';
const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

// * /apiEcomerce/1.0/users/
router.get('/', checkAuth, checkRoleAuth(['ADMIN']), getUsers);
router.get(
  '/:id',
  checkAuth,
  checkRoleAuth(['ADMIN', 'USER', 'VENDEDOR', 'REPARTIDOR']),
  getUser
);
router.put(
  '/:id',
  checkAuth,
  checkRoleAuth(['ADMIN', 'USER', 'VENDEDOR', 'REPARTADOR']),
  validateSchema(UserSchema),
  updateUser
);
router.patch(
  '/image/:id',
  checkAuth,
  checkRoleAuth(['ADMIN', 'USER', 'VENDEDOR', 'REPARTADOR']),
  upload.single('imageFile'),
  updateProfilePicture
);
router.delete(
  '/:id',
  checkAuth,
  checkRoleAuth(['ADMIN', 'USER', 'VENDEDOR', 'REPARTADOR']),
  deleteUser
);

/*   checkAuth,
  checkRoleAuth(['ADMIN', 'USUARIO', 'VENDEDOR', 'REPARTADOR']), */
export default router;
