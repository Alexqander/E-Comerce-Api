import { Router } from 'express';
import {
  getInfoProfileSeller,
  createInfoProfileSeller,
  createProductSeller,
  deleteProductSeller,
  updateProductSeller,
  updateInfoProfileSeller,
  getInfoTransactionsProductSeller,
  getInfoProductsSeller
} from '../controllers/profileSeller/profileSeller.controller.js';
import { checkAuth, checkRoleAuth } from '../middlewares/auth/auth.js';

const router = Router();

// Información del perfil
router.get('/profile/:id', getInfoProfileSeller);
router.post('/profile', createInfoProfileSeller);
router.put('/profile', updateInfoProfileSeller);

// Productos
router.get(
  '/profile/products/:id',
  checkAuth,
  checkRoleAuth(['VENDEDOR']),
  getInfoProductsSeller
);
router.post('/profile/products', createProductSeller);
router.put('/profile/products/:id', updateProductSeller);
router.delete('/profile/products/:id', deleteProductSeller);

// Transacciones de un producto específico
router.get(
  '/profile/products/:id/transactions',
  getInfoTransactionsProductSeller
);

export default router;
