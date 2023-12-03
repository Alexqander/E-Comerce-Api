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
