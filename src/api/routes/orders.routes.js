import { Router } from 'express';

import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} from '../controllers/orders.controller.js';

const router = Router();
// * /apiEcomerce/1.0/orders
router.get('/', getOrders);
router.get('/:id', getOrder);
//* Endpoint para consultar una orden de compra por el id del cliente
router.get('/user/:id', getOrder);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
