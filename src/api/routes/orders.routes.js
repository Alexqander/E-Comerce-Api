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
  deleteOrder,
  getRepartidores,
  getOrderItem,
  asignarRepartidor
} from '../controllers/orders/orders.controller.js';
import { checkAuth, checkRoleAuth } from '../middlewares/auth/auth.js';
const router = Router();
// * /apiEcomerce/1.0/orders
router.get('/', checkAuth, checkRoleAuth(['VENDEDOR', 'USER']), getOrders);
router.get('/:id', checkAuth, checkRoleAuth(['VENDEDOR', 'USER']), getOrder);
//* Endpoint para consultar una orden de compra por el id del cliente
router.get(
  '/user/:id',
  checkAuth,
  checkRoleAuth(['VENDEDOR', 'USER']),
  getOrder
);
router.post(
  '/',
  checkAuth,
  checkRoleAuth(['VENDEDOR', 'USER']),
  validateSchema(OrdersSchema),
  createOrder
);
router.put(
  '/:id',
  checkAuth,
  checkRoleAuth(['VENDEDOR', 'USER']),
  validateSchema(OrderUpdateSchema),
  updateOrder
);
router.delete(
  '/:id',
  checkAuth,
  checkRoleAuth(['VENDEDOR', 'USER']),
  deleteOrder
);

// * Obtener a los vendedores para asignarles una orden
router.get(
  '/profile/repartidores',
  checkAuth,
  checkRoleAuth(['VENDEDOR', 'USER']),
  getRepartidores
);

// * Obtener el orderItem de una orden de compra
router.get(
  '/profile/orderItem/:id',
  checkAuth,
  checkRoleAuth(['VENDEDOR', 'USER']),
  getOrderItem
);

router.patch(
  '/profile/repartidor/deliver/:id',
  checkAuth,
  checkRoleAuth(['VENDEDOR', 'USER']),
  asignarRepartidor
);

export default router;
