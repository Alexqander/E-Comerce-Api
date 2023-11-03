import { Router } from 'express';
import {
  logOutAllUserSessions,
  loginUser,
  logoutUser,
  registerUser,
  sigIn
} from '../controllers/auth/auth.controller.js';
import passport from 'passport';
import '../middlewares/auth/google.js';
import { validateSchema } from '../middlewares/validations/validationSchemas.js';
import {
  LoginSchema,
  registerSchema
} from '../middlewares/validations/dtos/auth.dto.js';
import { checkAuth } from '../middlewares/auth/auth.js';
const router = Router();
//* /apiEcomerce/1.0/auth/goggle
router.get(
  '/google',
  passport.authenticate('auth-google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ],
    session: false
  }),
  sigIn
);

router.post('/login', validateSchema(LoginSchema), loginUser);
router.post('/register', validateSchema(registerSchema), registerUser);
router.get('/logOutSession', checkAuth, logoutUser);
router.delete('/logOutAll/:id', logOutAllUserSessions);

export default router;
