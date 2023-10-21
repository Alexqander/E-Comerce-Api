import { Router } from 'express';
import { sigIn } from '../controllers/auth.controller.js';
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

export default router;
