import { Router } from 'express';

import {
  deleteUser,
  getUser,
  getUsers,
  updateUser
} from '../controllers/users/user.controller.js';
import { validateSchema } from '../middlewares/validations/validationSchemas.js';
import { UserSchema } from '../middlewares/validations/dtos/user.dto.js';
const router = Router();
// * /apiEcomerce/1.0/users/
router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/save');
router.put('/:id', validateSchema(UserSchema), updateUser);
router.delete('/:id', deleteUser);

export default router;
