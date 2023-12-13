import { Router } from 'express';
import {
  getInfoProfileSeller,
  createInfoProfileSeller,
  createProductSeller,
  deleteProductSeller,
  updateProductSeller,
  updateInfoProfileSeller,
  getInfoTransactionsProductSeller,
  getInfoProductsSeller,
  getStatsSeller,
  getOrdersSeller
} from '../controllers/profileSeller/profileSeller.controller.js';
import { checkAuth, checkRoleAuth } from '../middlewares/auth/auth.js';

const router = Router();

//* Información del perfil
router.get('/profile/:id', getInfoProfileSeller);
router.post('/profile', createInfoProfileSeller);
router.put('/profile', updateInfoProfileSeller);

// * stats del vendedor

router.get('/profile/stats/:id', getStatsSeller);

// * Productos
router.get(
  '/profile/products/:id',
  checkAuth,
  checkRoleAuth(['VENDEDOR']),
  getInfoProductsSeller
);

router.post('/profile/products', createProductSeller);
router.put('/profile/products/:id', updateProductSeller);
router.delete('/profile/products/:id', deleteProductSeller);

// ? Ordenes de compra
router.get('/profile/orders/:id', getOrdersSeller);

// * Transacciones de un producto específico
router.get(
  '/profile/products/:id/transactions',
  getInfoTransactionsProductSeller
);

export default router;
