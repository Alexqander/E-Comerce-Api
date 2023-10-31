import { Router } from 'express';
import { checkAuth } from '../middlewares/auth/auth.js';
const router = Router();

router.get('/', checkAuth);

export default router;
