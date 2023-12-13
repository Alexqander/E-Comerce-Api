import { Router } from 'express';
import {
  addProductToWishList,
  createAndAddProductsToShoppingCart,
  createBillingAddressBuyer,
  createInfoBuyer,
  createProductReview,
  createShippingAddressBuyer,
  createShoppingCartBuyer,
  createWishListBuyer,
  deleteShoppingCart,
  getInfoBuyer,
  getInfoWishListsBuyer,
  getLastShoppingCart,
  getOrderById,
  getOrdersBuyer,
  getShoppingCart,
  removeProductFromWishList,
  removeProductToShopingCart,
  savedProductsToShoppingCart,
  updateInfoBuyer,
  updateShoppingCartBuyer
} from '../controllers/profileBuyer/profileBuyer.controller.js';
import { validateSchema } from '../middlewares/validations/validationSchemas.js';
import {
  ArrayCartItemSchema,
  ShoppingCartSchema,
  newShoppingCartSchema
} from '../middlewares/validations/dtos/shoppingCart.dto.js';
import { checkAuth, checkRoleAuth } from '../middlewares/auth/auth.js';
const router = Router();

// ? Profile
router.get('/profile', getInfoBuyer);
router.post('/profile', createInfoBuyer);
router.put('/profile', updateInfoBuyer);

// ? WishLists
router.get(
  '/profile/wishLists/:id',
  checkAuth,
  checkRoleAuth(['USER']),
  getInfoWishListsBuyer
);
router.post(
  '/profile/wishLists',
  checkAuth,
  checkRoleAuth(['USER']),
  createWishListBuyer
);
router.patch(
  '/profile/wishLists/:id',
  checkAuth,
  checkRoleAuth(['USER']),
  addProductToWishList
);
router.patch(
  '/profile/wishLists/:id',
  checkAuth,
  checkRoleAuth(['USER']),
  removeProductFromWishList
);

// ? ShoppingCart
// * 1. Obtener el último carrito de compras
router.get(
  '/profile/shoppingCart/:id',
  checkAuth,
  checkRoleAuth(['USER']),
  getLastShoppingCart
);

// * Obtener carrito de compras por id

router.get(
  '/profile/shoppingCart/detail/:id',
  checkAuth,
  checkRoleAuth(['USER']),
  getShoppingCart
);

// * 2. Crear un carrito de compras
router.post(
  '/profile/shoppingCart',
  checkAuth,
  checkRoleAuth(['USER']),
  validateSchema(ShoppingCartSchema),
  createShoppingCartBuyer
);
// * 3. Agregar productos a un carrito de compras
router.post(
  '/profile/shoppingCart/add',
  checkAuth,
  checkRoleAuth(['USER']),
  validateSchema(newShoppingCartSchema),
  createAndAddProductsToShoppingCart
);
router.patch(
  '/profile/shoppingCart/:id',
  checkAuth,
  checkRoleAuth(['USER']),
  validateSchema(ArrayCartItemSchema),
  savedProductsToShoppingCart
);
router.patch(
  '/profile/shoppingCart/remove/:id',
  checkAuth,
  checkRoleAuth(['USER']),
  removeProductToShopingCart
);
router.put(
  '/profile/shoppingCart/:id',
  checkAuth,
  checkRoleAuth(['USER']),
  updateShoppingCartBuyer
);
// * 4. Eliminar un carrito de compras
router.delete(
  '/profile/shoppingCart/:id',
  checkAuth,
  checkRoleAuth(['USER']),
  deleteShoppingCart
);

// ? Addresses
router.post('/profile/shipping', createShippingAddressBuyer);
router.post('/profile/billing', createBillingAddressBuyer);

// ? Orders
router.get(
  '/profile/orders/:id',
  checkAuth,
  checkRoleAuth(['USER']),
  getOrdersBuyer
);
router.get(
  '/profile/orders/detail/:id',
  checkAuth,
  checkRoleAuth(['USER']),
  getOrderById
);

// ? Reviews

router.post(
  '/profile/reviews/new',
  checkAuth,
  checkRoleAuth(['USER']),
  createProductReview
);

export default router;
