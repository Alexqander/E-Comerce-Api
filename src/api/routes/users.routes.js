import { Router } from 'express';

import { getUsers } from '../controllers/user.controller.js';

const router = Router();
// * /apiEcomerce/1.0/users/
router.get('/', getUsers);
router.post('/save');
router.put('/update');
router.delete('/delete');

export default router;
