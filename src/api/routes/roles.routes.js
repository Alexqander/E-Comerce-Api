import { Router } from 'express';
import { createRole, getRoles } from '../controllers/roles/roles.controller.js';
import { checkAuth, checkRoleAuth } from '../middlewares/auth/auth.js';

const router = Router();

// * /apiEcomerce/1.0/roles/
router.get('/', checkAuth, checkRoleAuth(['ADMIN']), getRoles);
router.post('/', checkAuth, checkRoleAuth(['ADMIN']), createRole);

export default router;
