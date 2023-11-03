import { PrismaClient } from '@prisma/client';
import { getMessage } from '../../helpers/Messages.js';
// inicialiso prisma
const prisma = new PrismaClient();

export const fetchSellerProfileInfo = async (sellerId) => {
  try {
    const profile = await prisma.sellerProfile.findUnique({
      where: { userId: sellerId }
    });
    return getMessage(
      false,
      profile,
      'Seller profile info successfully obtained'
    );
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error fetching seller profile info'
    );
  }
};

export const fetchSellerProducts = async (sellerId) => {
  try {
    const products = await prisma.product.findMany({
      where: { vendorId: sellerId }
    });
    return getMessage(false, products, 'Products successfully fetched');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching products');
  }
};

export const fetchProductTransactions = async (productId) => {
  try {
    const transactions = await prisma.transactions.findMany({
      where: { products: { some: { id: productId } } }
    });
    return getMessage(
      false,
      transactions,
      'Transactions successfully fetched for the product'
    );
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error fetching transactions for the product'
    );
  }
};

export const createNewProduct = async (productData) => {
  try {
    const product = await prisma.product.create({ data: productData });
    return getMessage(false, product, 'Product successfully created');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating product');
  }
};

export const updateExistingProduct = async (productId, productData) => {
  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: productData
    });
    return getMessage(false, product, 'Product successfully updated');
  } catch (error) {
    return getMessage(true, error.message, 'Error updating product');
  }
};

export const createSellerProfileInfo = async (profileData) => {
  try {
    const profile = await prisma.sellerProfile.create({ data: profileData });
    return getMessage(
      false,
      profile,
      'Seller profile info successfully created'
    );
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error creating seller profile info'
    );
  }
};

export const updateSellerProfileInfo = async (sellerId, profileData) => {
  try {
    const profile = await prisma.sellerProfile.update({
      where: { userId: sellerId },
      data: profileData
    });
    return getMessage(
      false,
      profile,
      'Seller profile info successfully updated'
    );
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error updating seller profile info'
    );
  }
};

export const removeProduct = async (productId) => {
  try {
    await prisma.product.delete({ where: { id: productId } });
    return getMessage(false, null, 'Product successfully deleted');
  } catch (error) {
    return getMessage(true, error.message, 'Error deleting product');
  }
};
