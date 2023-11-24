import { Router } from 'express';
import {
  addProductToWishList,
  createAndAddProductsToShoppingCart,
  createBillingAddressBuyer,
  createInfoBuyer,
  createShippingAddressBuyer,
  createShoppingCartBuyer,
  createWishListBuyer,
  deleteShoppingCart,
  deleteWishListBuyer,
  getInfoBuyer,
  getInfoProductsWishListBuyer,
  getInfoWishListsBuyer,
  getLastShoppingCart,
  removeProductFromWishList,
  removeProductToShopingCart,
  savedProductsToShoppingCart,
  updateInfoBuyer,
  updateShoppingCartBuyer,
  updateWishListBuyer
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
router.get('/profile/wishLists', getInfoWishListsBuyer);
router.post('/profile/wishLists', createWishListBuyer);
router.patch('/profile/wishLists/:id', addProductToWishList);
router.patch('/profile/wishLists/:id', removeProductFromWishList);
router.put('/profile/wishLists/:id', updateWishListBuyer);
router.delete('/profile/wishLists/:id', deleteWishListBuyer);
router.get('/profile/wishLists/:id/products', getInfoProductsWishListBuyer);

// ? ShoppingCart
// * 1. Obtener el último carrito de compras
router.get(
  '/profile/shoppingCart/:id',
  checkAuth,
  checkRoleAuth(['USER']),
  getLastShoppingCart
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

export default router;
