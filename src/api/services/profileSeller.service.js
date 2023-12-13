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
  console.log('🛒StoreId', storeId);
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

export const fetchStatsSeller = async (sellerId) => {
  try {
    const store = await prisma.store.findFirst({
      where: { sellerId }
    });
    console.log('🛒Store', store);
    const totalProducts = await prisma.product.count({
      where: {
        storeId: store.id
      }
    });
    console.log('🧩 Products', totalProducts);
    const totalOrders = await prisma.transactionItem.count({
      where: { sellerId }
    });
    console.log('📦 Orders', totalOrders);

    const totalReviews = await prisma.reviews.count({
      where: {
        product: {
          storeId: store.id
        }
      }
    });

    console.log('📝 Reviews', totalReviews);

    return getMessage(
      false,
      { totalProducts, totalOrders, totalReviews },
      'Stats successfully fetched'
    );
  } catch (error) {
    console.log(error);
    return getMessage(true, error.message, 'Error fetching stats');
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

// * Funciones para obtener las ordenes de compra de un vendedor

export const fetchOrdersBySeller = async (sellerId) => {
  try {
    const orders = await prisma.orderItem.findMany({
      orderBy: {
        Order: {
          orderedAt: 'desc'
        }
      },
      where: {
        Product: {
          store: {
            sellerId
          }
        }
      },
      select: {
        id: true,
        quantity: true,
        Order: {
          select: {
            id: true,
            buyer: {
              select: {
                user: {
                  select: {
                    name: true,
                    lastName: true,
                    email: true,
                    phoneNumber: true
                  }
                },
                shippingAddresses: {
                  take: 1,
                  orderBy: {
                    createdAt: 'desc'
                  },
                  select: {
                    city: true,
                    state: true,
                    street: true,
                    country: true,
                    postalCode: true
                  }
                }
              }
            },
            orderStatus: true,
            orderedAt: true,
            deliverDate: true,
            deliveryStatus: true
          }
        },
        Product: {
          select: {
            name: true,
            price: true,
            description: true,
            store: {
              select: {
                name: true,
                seller: {
                  select: {
                    id: true,
                    store: true
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
        }
      }
    });
    return getMessage(false, orders, 'Orders successfully fetched');
  } catch (error) {
    console.log(error);
    return getMessage(true, error.message, 'Error fetching orders');
  }
};

// * Cambiar el estado de una orden de compra

export const updateOrderStatus = async (orderId, status) => {
  try {
    const order = await prisma.orderItem.update({
      where: { id: orderId },
      data: { status }
    });
    return getMessage(false, order, 'Order status successfully updated');
  } catch (error) {
    return getMessage(true, error.message, 'Error updating order status');
  }
};

// * Asignar la orden a un repartidor

export const assignOrderToDelivery = async (orderId, deliveryId) => {
  try {
    const order = await prisma.orderItem.update({
      where: { id: orderId },
      data: { deliveryId }
    });
    return getMessage(false, order, 'Order successfully assigned to delivery');
  } catch (error) {
    return getMessage(true, error.message, 'Error assigning order to delivery');
  }
};
