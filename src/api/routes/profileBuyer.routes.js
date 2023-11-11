import { Router } from 'express';
import {
  createBillingAddressBuyer,
  createInfoBuyer,
  createShippingAddressBuyer,
  createShoppingCartBuyer,
  createWishListBuyer,
  deleteShoppingCartBuyer,
  deleteWishListBuyer,
  getInfoBuyer,
  getInfoProductsShoppingCartBuyer,
  getInfoProductsWishListBuyer,
  getInfoShoppingCartBuyer,
  getInfoWishListsBuyer,
  updateInfoBuyer,
  updateShoppingCartBuyer,
  updateWishListBuyer
} from '../controllers/profileBuyer/profileBuyer.controller.js';
import { validateSchema } from '../middlewares/validations/validationSchemas.js';
import { ShoppingCartSchema } from '../middlewares/validations/dtos/shoppingCart.dto.js';
const router = Router();

// ? Profile
router.get('/profile', getInfoBuyer);
router.post('/profile', createInfoBuyer);
router.put('/profile', updateInfoBuyer);

// ? WishLists
router.get('/profile/wishLists', getInfoWishListsBuyer);
router.post('/profile/wishLists', createWishListBuyer);
router.put('/profile/wishLists/:id', updateWishListBuyer);
router.delete('/profile/wishLists/:id', deleteWishListBuyer);
router.get('/profile/wishLists/:id/products', getInfoProductsWishListBuyer);

// ? ShoppingCart
router.get('/profile/shoppingCart', getInfoShoppingCartBuyer);
router.post(
  '/profile/shoppingCart',
  validateSchema(ShoppingCartSchema),
  createShoppingCartBuyer
);
router.put('/profile/shoppingCart/:id', updateShoppingCartBuyer);
router.delete('/profile/shoppingCart/:id', deleteShoppingCartBuyer);
router.get(
  '/profile/shoppingCart/:id/products',
  getInfoProductsShoppingCartBuyer
);

// ? Addresses
router.post('/profile/shipping', createShippingAddressBuyer);
router.post('/profile/billing', createBillingAddressBuyer);

export default router;
