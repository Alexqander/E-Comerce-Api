import { prisma } from '../../loaders/database.js';
import { getMessage } from '../../helpers/Messages.js';
// inicialiso prisma

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

export const fetchSellerProducts = async (storeId) => {
  try {
    const products = await prisma.product.findMany({
      where: { storeId },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        storeId: true,
        subCategoryId: true,
        stock: true,
        SubCategory: {
          select: {
            name: true,
            category: {
              select: {
                id: true,
                name: true
              }
            }
          }
        },
        Images: {
          take: 1,
          select: {
            url: true
          }
        }
      }
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
    const store = await prisma.store.create({
      data: {
        name: profile.storeName,
        sellerId: profile.userId
      }
    });
    await prisma.$transaction([profile, store]);
    return getMessage(
      false,
      { profile, store },
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
