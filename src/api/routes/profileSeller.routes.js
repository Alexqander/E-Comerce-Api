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

const router = Router();

// Información del perfil
router.get('/profile', getInfoProfileSeller);
router.post('/profile', createInfoProfileSeller);
router.put('/profile', updateInfoProfileSeller);

// Productos
router.get('/profile/products', getInfoProductsSeller);
router.post('/profile/products', createProductSeller);
router.put('/profile/products/:id', updateProductSeller);
router.delete('/profile/products/:id', deleteProductSeller);

// Transacciones de un producto específico
router.get(
  '/profile/products/:id/transactions',
  getInfoTransactionsProductSeller
);

export default router;
