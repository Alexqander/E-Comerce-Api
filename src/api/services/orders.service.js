import { prisma } from '../../loaders/database.js';
import { getMessage } from '../../helpers/Messages.js';

export const findOrders = async () => {
  try {
    const orders = await prisma.orders.findMany();
    return getMessage(false, orders, 'Data successfully obtained');
  } catch (error) {
    return getMessage(true, error.message, 'Error al obtener los usuarios');
  }
};
export const findOrderById = async (id) => {
  try {
    const order = await prisma.orders.findUnique({
      where: {
        id
      },
      include: {
        orderItems: true
      }
    });

    return order
      ? getMessage(false, order, 'Data successfully obtained')
      : getMessage(true, order, 'Order not exists');
  } catch (error) {
    return getMessage(true, error.message, 'Order not exists');
  }
};

export const sevedOrder = async (order) => {
  try {
    const newOrder = await prisma.orders.create({
      data: {
        ...order
      }
    });

    return getMessage(false, newOrder, 'Order created successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating order');
  }
};

export const sevedOrderItems = async (orderItems) => {
  try {
    const newOrderItems = await prisma.orderItem.createMany({
      data: orderItems
    });

    return getMessage(false, newOrderItems, 'Order created successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating order');
  }
};

export const modifiedOrder = async (id, order) => {
  try {
    const updateOrder = await prisma.orders.update({
      where: {
        id
      },
      data: {
        ...order
      }
    });

    return getMessage(false, updateOrder, 'Order updated successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error updating order');
  }
};
export const removeOrder = async (id) => {
  try {
    const deleteOrder = await prisma.orders.delete({
      where: {
        id
      }
    });

    return getMessage(false, deleteOrder, 'Order deleted successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error deleting order');
  }
};

export const findRepartidores = async () => {
  try {
    const repartidores = await prisma.user.findMany({
      where: {
        roleId: 3
      },
      select: {
        id: true,
        name: true,
        lastName: true,
        courierProfile: true
      }
    });
    return getMessage(false, repartidores, 'Data successfully obtained');
  } catch (error) {
    return getMessage(true, error.message, 'Error al obtener los usuarios');
  }
};

export const findOrderItem = async (id) => {
  try {
    const orderItem = await prisma.orderItem.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        quantity: true,
        orderId: true,
        Product: {
          select: {
            name: true,
            description: true,
            price: true,
            store: {
              select: {
                id: true,
                name: true,
                sellerId: true
              }
            },
            Images: {
              take: 1,
              select: {
                url: true
              }
            }
          }
        },
        Order: {
          select: {
            id: true,
            orderedAt: true,
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
        }
      }
    });
    console.log('🚀 Estoy buscando el orderItem', orderItem);

    return orderItem
      ? getMessage(false, orderItem, 'Data successfully obtained')
      : getMessage(true, orderItem, 'Order not exists');
  } catch (error) {
    console.log(error);
    return getMessage(true, error.message, 'Order not exists');
  }
};

export const assignOrderToDelivery = async (orderId, deliverData) => {
  try {
    const orderUpdate = await prisma.orders.update({
      where: { id: orderId },
      data: {
        orderStatus: 'EN CAMINO',
        deliveryStatus: 'EN CAMINO',
        courierId: deliverData.repartidor,
        deliverDate: new Date(deliverData.fechaEntrega)
      }
    });
    return getMessage(
      false,
      orderUpdate,
      'Order successfully assigned to delivery'
    );
  } catch (error) {
    console.log('❌Error', error);
    return getMessage(true, error.message, 'Error assigning order to delivery');
  }
};
