import { Router } from 'express';
import {
  getAllUsers,
  getUserDetails,
  getAllSellers,
  getAllCouriers,
  getAllTransactions,
  getTransactionDetails,
  getSalesStats,
  getAllProducts,
  getProductDetails,
  getAllOrders,
  getOrderDetails,
  getPendingOrders,
  getCompletedOrders,
  getGeneralStats,
  getTopProducts,
  getTopSellers,
  getAllReviews,
  getReviewsForProduct
} from '../controllers/profileAdmin/profileAdmin.controller.js';

const router = Router();

// Usuarios
router.get('/users', getAllUsers);
router.get('/users/:userId', getUserDetails);
router.get('/sellers', getAllSellers);
router.get('/couriers', getAllCouriers);

// Transacciones y Ventas
router.get('/transactions', getAllTransactions);
router.get('/transactions/:transactionId', getTransactionDetails);
router.get('/sales/stats', getSalesStats);

// Productos
router.get('/products', getAllProducts);
router.get('/products/:productId', getProductDetails);

// Órdenes
router.get('/orders', getAllOrders);
router.get('/orders/:orderId', getOrderDetails);
router.get('/orders/pending', getPendingOrders);
router.get('/orders/completed', getCompletedOrders);

// Estadísticas Generales
router.get('/stats/overview', getGeneralStats);
router.get('/stats/top-products', getTopProducts);
router.get('/stats/top-sellers', getTopSellers);

// Revisiones y Feedback
router.get('/reviews', getAllReviews);
router.get('/products/:productId/reviews', getReviewsForProduct);

export default router;
