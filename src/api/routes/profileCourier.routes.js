import { Router } from 'express';
import {
  getOrdersDelivered,
  getOrdersToDeliver,
  modifiedOrderStatus
} from '../controllers/profileCourier/profileCourier.controller.js';
import { checkAuth, checkRoleAuth } from '../middlewares/auth/auth.js';

const router = Router();
// *  Información de las ordenes que tiene que entregar un repartidor

router.get(
  '/profile/repartidor/deliver/:id',
  checkAuth,
  checkRoleAuth(['REPARTIDOR']),
  getOrdersToDeliver
);
router.get('/profile/repartidor/history/:id', getOrdersDelivered);
router.patch('/profile/repartidor/deliver/:id', modifiedOrderStatus);

export default router;
