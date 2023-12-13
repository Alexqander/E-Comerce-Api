import { Router } from 'express';
import {
  deleteShoppingCart,
  getShoppingCart,
  updateShoppingCart
} from '../controllers/shoppingCart/shoppingCart.controller.js';
import { createShoppingCart } from '../services/shoppingCart.service.js';

const router = Router();

router.get('/users/:userId/shoppingCart', getShoppingCart);
router.post('/users/:userId/shoppingCart', createShoppingCart);
router.put('/users/:userId/shoppingCart', updateShoppingCart);
router.delete('/users/:userId/shoppingCart', deleteShoppingCart);

export default router;
