import { prisma } from '../../loaders/database.js';
import { getMessage } from '../../helpers/Messages.js';

// * Fetch buyer info
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

// * Create buyer info
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

// * Update buyer info
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
// * Operaciones para Wish Lists
export const fetchWishListsService = async (id) => {
  try {
    const wishLists = await prisma.wishList.findMany({
      where: {
        userId: id
      }
    });
    return getMessage(false, wishLists, 'Data successfully obtained');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching wish lists');
  }
};

export const saveProductToWishList = async (wishListId, productId) => {
  try {
    const updatedWishList = await prisma.wishList.update({
      where: { id: wishListId },
      data: {
        products: {
          connect: {
            id: productId
          }
        }
      }
    });
    return getMessage(
      false,
      updatedWishList,
      'Product successfully added to wish list'
    );
  } catch (error) {
    return getMessage(true, error.message, 'Error adding product to wish list');
  }
};

export const deleteProductFromWishList = async (wishListId, productId) => {
  try {
    const updatedWishList = await prisma.wishList.update({
      where: { id: wishListId },
      data: {
        products: {
          disconnect: {
            id: productId
          }
        }
      }
    });
    return getMessage(
      false,
      updatedWishList,
      'Product successfully removed from wish list'
    );
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error removing product from wish list'
    );
  }
};

export const createWishList = async (wishListData) => {
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

// * Operaciones para Shopping Cart
// * 1. Crear un nuevo carrito de compras y en caso de que se incluyan productos en el body, agregarlos al carrito
export const createShoppingCartService = async (cartData) => {
  try {
    const newCart = await prisma.$transaction(async (prisma) => {
      // Crear el nuevo carrito de compras
      const createdCart = await prisma.shoppingCart.create({
        data: {
          orderStatus: cartData.orderStatus,
          buyerId: cartData.buyerId,
          quantity: 0
        }
      });

      // Si se incluyen productos en el body, agregarlos al carrito
      if (cartData.products && cartData.products.length > 0) {
        console.log('cartData.products', cartData.products);
        await addProductsToShoppingCart(createdCart.id, cartData.products);
      }

      return createdCart;
    });
    return getMessage(false, newCart, 'Shopping cart successfully created');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating shopping cart');
  }
};

export const findLastShoppingCart = async (id) => {
  try {
    const lastCart = await prisma.shoppingCart.findFirst({
      where: {
        buyerId: id
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        cartItems: {
          select: {
            Product: {
              select: {
                id: true,
                Images: true,
                name: true,
                price: true
              }
            },
            quantity: true
          }
        }
      }
    });
    return getMessage(false, lastCart, 'Last shopping cart successfully found');
  } catch (error) {
    return getMessage(true, error.message, 'Error finding last shopping cart');
  }
};

export const findLastPendingShoppingCart = async (id) => {
  try {
    const lastPendingCart = await prisma.shoppingCart.findFirst({
      where: {
        id,
        orderStatus: 'pending_payment'
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        cartItems: {
          select: {
            Product: {
              select: {
                id: true,
                Images: true,
                name: true,
                price: true
              }
            },
            quantity: true
          }
        }
      }
    });
    return getMessage(
      false,
      lastPendingCart,
      'Last pending shopping cart successfully found'
    );
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error finding last pending shopping cart'
    );
  }
};

export const findShoppingCart = async (id) => {
  try {
    const cart = await prisma.shoppingCart.findUnique({
      where: { id },
      include: {
        cartItems: {
          select: {
            Product: {
              select: {
                id: true,
                Images: true,
                name: true,
                price: true,
                store: {
                  select: {
                    sellerId: true,
                    name: true
                  }
                }
              }
            },
            quantity: true
          }
        }
      }
    });
    return getMessage(false, cart, 'Shopping cart successfully found');
  } catch (error) {
    return getMessage(true, error.message, 'Error finding shopping cart');
  }
};

export const updateShoppingCart = async (id, orderStatus) => {
  try {
    const updatedCart = await prisma.shoppingCart.update({
      where: { id },
      data: { orderStatus }
    });
    return getMessage(false, updatedCart, 'Shopping cart successfully updated');
  } catch (error) {
    return getMessage(true, error.message, 'Error updating shopping cart');
  }
};

export const addProductsToShoppingCart = async (cartId, products) => {
  console.log('cartId', cartId);
  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Obtener todos los CartItems existentes para ese cartId
      const existingCartItems = await prisma.cartItem.findMany({
        where: { cartId }
      });
      const existingProductIds = new Set(
        existingCartItems.map((item) => item.productId)
      );

      // Separar productos nuevos y existentes
      const newProducts = [];
      const existingProducts = [];

      products.forEach((product) => {
        if (existingProductIds.has(product.productId)) {
          existingProducts.push(product);
        } else {
          newProducts.push({
            cartId,
            productId: product.productId,
            quantity: product.quantity
          });
        }
      });

      // Agregar productos nuevos
      if (newProducts.length > 0) {
        await prisma.cartItem.createMany({ data: newProducts });
      }

      // Actualizar productos existentes
      for (const product of existingProducts) {
        const existingItem = existingCartItems.find(
          (item) => item.productId === product.productId
        );
        await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: product.quantity }
        });
      }

      // Opcionalmente, recupera el carrito actualizado para calcular la nueva cantidad total
      const updatedCart = await prisma.shoppingCart.findUnique({
        where: { id: cartId },
        include: { cartItems: true }
      });

      if (!updatedCart) {
        throw new Error('Shopping cart not found');
      }

      // Calcula la cantidad total de productos en el carrito
      const totalQuantity = updatedCart.cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );

      // Actualiza el carrito de compras con la nueva cantidad y estado
      const finalCartUpdate = await prisma.shoppingCart.update({
        where: { id: cartId },
        data: {
          quantity: totalQuantity,
          orderStatus: 'modified'
        }
      });

      return {
        finalCartUpdate
      };
    });

    return getMessage(
      false,
      result,
      'Products successfully added or updated in cart'
    );
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error adding products and updating cart'
    );
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

export const deleteProductFromShoppingCart = async (cartId, product) => {
  try {
    const result = await prisma.$transaction(async (prisma) => {
      // Comprobar si hay cartItems en el carrito
      const existingCartItems = await prisma.cartItem.findMany({
        where: { cartId }
      });

      if (existingCartItems.length === 0) {
        throw new Error('No items in shopping cart');
      }

      // Encontrar el cartItem específico para eliminar
      const itemToDelete = existingCartItems.find(
        (item) => item.productId === product.productId
      );

      if (!itemToDelete) {
        throw new Error('Product not found in cart');
      }

      // Eliminar el cartItem específico
      await prisma.cartItem.delete({
        where: { id: itemToDelete.id }
      });

      // Actualizar la cantidad total y el estado del carrito
      const totalQuantity = existingCartItems.reduce(
        (sum, item) =>
          item.id !== itemToDelete.id ? sum + item.quantity : sum,
        0
      );

      const finalCartUpdate = await prisma.shoppingCart.update({
        where: { id: cartId },
        data: {
          quantity: totalQuantity,
          orderStatus: 'modified'
        }
      });

      return finalCartUpdate;
    });

    return getMessage(false, result, 'Product successfully removed from cart');
  } catch (error) {
    return getMessage(true, error.message, 'Error removing product from cart');
  }
};

export const deleteShoppingCartService = async (id) => {
  try {
    await prisma.$transaction(async (prisma) => {
      // Eliminar los registros de cartItems asociados con el carrito
      await prisma.cartItem.deleteMany({
        where: { cartId: id }
      });

      // Eliminar el carrito de compras
      await prisma.shoppingCart.delete({
        where: { id }
      });
    });

    return getMessage(false, null, 'Shopping cart successfully deleted');
  } catch (error) {
    return getMessage(true, error.message, 'Error deleting shopping cart');
  }
};

// * Ordenes de compra
export const fetchOrdersByBuyer = async (id) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        buyerId: id
      },
      orderBy: {
        orderedAt: 'desc'
      }
    });
    return getMessage(false, orders, 'Data successfully obtained');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching orders');
  }
};

export const fetchOrderById = async (id) => {
  try {
    const order = await prisma.orders.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        buyer: {
          select: {
            id: true,
            shippingAddresses: true,
            billingAddresses: true
          }
        },
        orderedAt: true,
        orderStatus: true,
        orderItems: {
          select: {
            id: true,
            price: true,
            Product: {
              select: {
                id: true,
                name: true,
                price: true,
                Images: true,
                store: {
                  select: {
                    name: true
                  }
                }
              }
            },
            quantity: true
          }
        }
      }
    });
    return getMessage(false, order, 'Data successfully obtained');
  } catch (error) {
    console.log(error);
    return getMessage(true, error.message, 'Error fetching order');
  }
};

// * 4. Direcciones
export const createShippingAddressService = async (addressData, buyerId) => {
  const { city, country, line1, postal_code: postalCode, state } = addressData;

  try {
    const newAddress = await prisma.shippingDirections.create({
      data: {
        street: line1,
        city,
        state,
        postalCode,
        country,
        buyerId
      }
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
