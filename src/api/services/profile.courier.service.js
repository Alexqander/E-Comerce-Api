import { prisma } from '../../loaders/database.js';
import { getMessage } from '../../helpers/Messages.js';

// * Obtener los pedidos que tenga por entregar un repartidor
export const fetchOrdersToDeliver = async (courierId) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        courierId,
        deliveryStatus: 'EN CAMINO' // Ajusta esto según tus estados de pedido
      },
      include: {
        orderItems: {
          include: {
            Product: true
          }
        },
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
        }
      }
    });
    return getMessage(false, orders, 'Orders for courier fetched successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching orders for courier');
  }
};

// * Obtener el historial de pedidos que ha repartido un repartidor
export const fetchOrdersDelivered = async (courierId) => {
  try {
    const orders = await prisma.orders.findMany({
      where: {
        courierId,
        deliveryStatus: 'Delivered' // Ajusta esto según tus estados de pedido
      },
      include: {
        orderItems: {
          include: {
            Product: true
          }
        },
        buyer: {
          select: {
            user: {
              select: {
                name: true,
                lastName: true,
                email: true,
                phoneNumber: true
              }
            }
          }
        }
      }
    });
    return getMessage(false, orders, 'Orders for courier fetched successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching orders for courier');
  }
};

// * Actualizar el estado de un pedido
export const updateOrderStatus = async (orderId, status) => {
  try {
    const order = await prisma.orders.update({
      where: { id: orderId },
      data: { deliveryStatus: status }
    });
    return getMessage(false, order, 'Order status successfully updated');
  } catch (error) {
    return getMessage(true, error.message, 'Error updating order status');
  }
};
