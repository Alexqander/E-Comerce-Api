import { prisma } from '../../loaders/database.js';
import { getMessage } from '../../helpers/Messages.js';

// * 1. Obteniendo la lista de deseos
export const fetchLastWishList = async (buyerId) => {
  try {
    const lastWishList = await prisma.wishList.findFirst({
      where: {
        buyerId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        wishListItems: {
          select: {
            Product: {
              select: {
                id: true,
                Images: true,
                name: true,
                price: true
              }
            }
          }
        }
      }
    });
    return getMessage(false, lastWishList, 'Last wishList  successfully found');
  } catch (error) {
    return getMessage(true, error.message, 'Error finding last wishList');
  }
};

// * 2. Creando una lista de deseos

export const createWishList = async (buyerId) => {
  try {
    const wishList = await prisma.wishList.create({
      data: {
        buyerId,
        name: 'Lista de deseos'
      }
    });
    return getMessage(false, wishList, 'Wish list created successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating wish list');
  }
};

// * 3. Guardando un producto en la lista de deseos

export const saveProductToWishList = async (wishListId, products) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const wishList = await prisma.wishList.findUnique({
        where: {
          id: wishListId
        }
      });
      if (!wishList) {
        return getMessage(true, null, 'Wish list not found');
      }
      const wishListItems = await prisma.wishListItem.createMany({
        data: products.map((product) => ({
          wishListId,
          productId: product.id
        }))
      });
      return wishListItems;
    });
    return getMessage(false, result, 'Product added to wish list successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error saving product to wish list');
  }
};

// * 4. Eliminando un producto de la lista de deseos

export const deleteProductFromWishList = async (wishListId, productId) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      const wishList = await prisma.wishList.findUnique({
        where: {
          id: wishListId
        }
      });
      if (!wishList) {
        return getMessage(true, null, 'Wish list not found');
      }
      const wishListItem = await prisma.wishListItem.deleteMany({
        where: {
          wishListId,
          productId
        }
      });
      return wishListItem;
    });
    return getMessage(
      false,
      result,
      'Product removed from wish list successfully'
    );
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error removing product from wish list'
    );
  }
};
