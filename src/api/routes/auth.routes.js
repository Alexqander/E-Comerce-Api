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

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/logOutSession', logoutUser);
router.delete('/logOutAll/:id', logOutAllUserSessions);

export default router;
