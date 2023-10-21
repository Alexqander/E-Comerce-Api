import { Router } from 'express';

import { getUsers } from '../controllers/user.controller.js';

const router = Router();

router.get('/', getUsers);

export default router;
