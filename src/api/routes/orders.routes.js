import { Router } from 'express';
import { validateSchema } from '../middlewares/validations/validationSchemas.js';
import {
  OrderUpdateSchema,
  OrdersSchema
} from '../middlewares/validations/dtos/orders.dto.js';
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} from '../controllers/orders/orders.controller.js';
import { checkAuth, checkRoleAuth } from '../middlewares/auth/auth.js';
const router = Router();
// * /apiEcomerce/1.0/orders
router.get('/', checkAuth, checkRoleAuth(['VENDEDOR', 'CLIENTE']), getOrders);
router.get('/:id', checkAuth, checkRoleAuth(['VENDEDOR', 'CLIENTE']), getOrder);
//* Endpoint para consultar una orden de compra por el id del cliente
router.get(
  '/user/:id',
  checkAuth,
  checkRoleAuth(['VENDEDOR', 'CLIENTE']),
  getOrder
);
router.post(
  '/',
  checkAuth,
  checkRoleAuth(['VENDEDOR', 'CLIENTE']),
  validateSchema(OrdersSchema),
  createOrder
);
router.put(
  '/:id',
  checkAuth,
  checkRoleAuth(['VENDEDOR', 'CLIENTE']),
  validateSchema(OrderUpdateSchema),
  updateOrder
);
router.delete(
  '/:id',
  checkAuth,
  checkRoleAuth(['VENDEDOR', 'CLIENTE']),
  deleteOrder
);

export default router;
