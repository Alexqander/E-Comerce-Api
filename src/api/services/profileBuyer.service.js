import { PrismaClient } from '@prisma/client';
import { getMessage } from '../../helpers/Messages.js';

const prisma = new PrismaClient();

// Fetch buyer info
export const fetchBuyerInfoService = async () => {
  try {
    const buyerInfo = await prisma.buyerProfile.findUnique({
      where: {
        userId: 'someUserId' // Replace this with how you're fetching the user's ID
      }
    });
    return getMessage(false, buyerInfo, 'Data successfully obtained');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching buyer info');
  }
};

// Create buyer info
export const createBuyerInfoService = async (buyerData) => {
  try {
    const newBuyerInfo = await prisma.buyerProfile.create({
      data: buyerData
    });
    return getMessage(false, newBuyerInfo, 'Data successfully created');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating buyer info');
  }
};

// Update buyer info
export const updateBuyerInfoService = async (buyerData) => {
  try {
    const updatedBuyerInfo = await prisma.buyerProfile.update({
      where: {
        userId: 'someUserId' // Replace this with how you're fetching the user's ID
      },
      data: buyerData
    });
    return getMessage(false, updatedBuyerInfo, 'Data successfully updated');
  } catch (error) {
    return getMessage(true, error.message, 'Error updating buyer info');
  }
};
// Operaciones para Wish Lists
export const fetchWishListsService = async () => {
  try {
    const wishLists = await prisma.wishList.findMany({
      where: {
        userId: 'someUserId'
      }
    });
    return getMessage(false, wishLists, 'Data successfully obtained');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching wish lists');
  }
};

export const createWishListService = async (wishListData) => {
  try {
    const newWishList = await prisma.wishList.create({
      data: wishListData
    });
    return getMessage(false, newWishList, 'Wish list successfully created');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating wish list');
  }
};

export const updateWishListService = async (id, updatedData) => {
  try {
    const updatedWishList = await prisma.wishList.update({
      where: { id },
      data: updatedData
    });
    return getMessage(false, updatedWishList, 'Wish list successfully updated');
  } catch (error) {
    return getMessage(true, error.message, 'Error updating wish list');
  }
};

export const deleteWishListService = async (id) => {
  try {
    await prisma.wishList.delete({ where: { id } });
    return getMessage(false, null, 'Wish list successfully deleted');
  } catch (error) {
    return getMessage(true, error.message, 'Error deleting wish list');
  }
};

export const fetchProductsFromWishListService = async (wishListId) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        wishListId
      }
    });
    return getMessage(
      false,
      products,
      'Products from wish list successfully fetched'
    );
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error fetching products from wish list'
    );
  }
};

// Operaciones para Shopping Cart
export const createShoppingCartService = async (cartData) => {
  try {
    const newCart = await prisma.shoppingCart.create({
      data: cartData
    });
    return getMessage(false, newCart, 'Shopping cart successfully created');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating shopping cart');
  }
};

export const updateShoppingCartService = async (id, updatedData) => {
  try {
    const updatedCart = await prisma.shoppingCart.update({
      where: { id },
      data: updatedData
    });
    return getMessage(false, updatedCart, 'Shopping cart successfully updated');
  } catch (error) {
    return getMessage(true, error.message, 'Error updating shopping cart');
  }
};

export const deleteShoppingCartService = async (id) => {
  try {
    await prisma.shoppingCart.delete({ where: { id } });
    return getMessage(false, null, 'Shopping cart successfully deleted');
  } catch (error) {
    return getMessage(true, error.message, 'Error deleting shopping cart');
  }
};

export const fetchProductsFromShoppingCartService = async (cartId) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        shoppingCartId: cartId
      }
    });
    return getMessage(
      false,
      products,
      'Products from shopping cart successfully fetched'
    );
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error fetching products from shopping cart'
    );
  }
};
// 4. Direcciones
export const createShippingAddressService = async (addressData) => {
  try {
    const newAddress = await prisma.address.create({
      data: addressData
    });
    return getMessage(false, newAddress, 'Data successfully created');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating shipping address');
  }
};

export const createBillingAddressService = async (addressData) => {
  try {
    const newAddress = await prisma.address.create({
      data: addressData
    });
    return getMessage(false, newAddress, 'Data successfully created');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating billing address');
  }
};
