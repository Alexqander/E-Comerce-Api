import { Router } from 'express';
import {
  createInfoProfile,
  getInfoOrdersAsigned,
  getInfoProfile,
  updateInfoProfile,
  updateOrderAsigned
} from '../controllers/profileCourier/profileCourier.controller.js';

const router = Router();
// Información del perfil
router.get('/profile', getInfoProfile);
router.post('/profile', createInfoProfile);
router.put('/profile', updateInfoProfile);
// Ordenes asignadas
router.get('/profile/orders', getInfoOrdersAsigned);
router.put('/profile/orders/:id', updateOrderAsigned);

export default router;
