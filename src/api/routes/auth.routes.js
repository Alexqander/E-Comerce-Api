import { Router } from 'express';
import {
  logOutAllUserSessions,
  loginUser,
  logoutUser,
  registerUser
} from '../controllers/auth/auth.controller.js';
import { validateSchema } from '../middlewares/validations/validationSchemas.js';
import {
  LoginSchema,
  registerSchema
} from '../middlewares/validations/dtos/auth.dto.js';
import { checkAuth } from '../middlewares/auth/auth.js';
const router = Router();

router.post('/login', validateSchema(LoginSchema), loginUser);
router.post('/register', validateSchema(registerSchema), registerUser);
router.get('/logOutSession', checkAuth, logoutUser);
router.delete('/logOutAll/:id', logOutAllUserSessions);

export default router;
