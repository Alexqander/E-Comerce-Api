import { prisma } from '../../loaders/database.js';
import { getMessage } from '../../helpers/Messages.js';

export const findShoppingCartByUserId = async (userId) => {
  try {
    const shoppingCart = await prisma.shoppingCart.findUnique({
      where: {
        userId
      },
      include: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            description: true,
            stock: true,
            storeId: true,
            store: {
              select: {
                name: true
              }
            },
            subCategoryId: true,
            SubCategory: {
              select: {
                name: true
              }
            },
            Images: {
              select: {
                url: true
              }
            }
          }
        }
      }
    });
    return getMessage(false, shoppingCart, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
export const createShoppingCart = async (userId) => {
  try {
    const shoppingCart = await prisma.shoppingCart.create({
      data: {
        userId
      }
    });
    return getMessage(false, shoppingCart, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
export const modificadeShoppingCart = async (userId, products) => {
  try {
    const shoppingCart = await prisma.shoppingCart.update({
      where: {
        userId
      },
      data: {
        products
      }
    });
    return getMessage(false, shoppingCart, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
export const removeShoppingCart = async (userId) => {
  try {
    const shoppingCart = await prisma.shoppingCart.delete({
      where: {
        userId
      }
    });
    return getMessage(false, shoppingCart, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
