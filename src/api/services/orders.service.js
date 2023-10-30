import { PrismaClient } from '@prisma/client';
import { getMessage } from '../../helpers/Messages.js';

const prisma = new PrismaClient();

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
    const order = await prisma.order.findUnique({
      where: {
        id
      }
    });

    return order
      ? getMessage(false, order, 'Data successfully obtained')
      : getMessage(true, order, 'Order not exists');
  } catch (error) {
    return getMessage(true, error.message, 'Order not exists');
  }
};

export const findOrderByUserId = async (id) => {};
export const sevedOrder = async (order) => {
  try {
    const newOrder = await prisma.order.create({
      data: {
        ...order
      }
    });

    return getMessage(false, newOrder, 'Order created successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error creating order');
  }
};
export const modifiedOrder = async (id, order) => {
  try {
    const updateOrder = await prisma.order.update({
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
    const deleteOrder = await prisma.order.delete({
      where: {
        id
      }
    });

    return getMessage(false, deleteOrder, 'Order deleted successfully');
  } catch (error) {
    return getMessage(true, error.message, 'Error deleting order');
  }
};
