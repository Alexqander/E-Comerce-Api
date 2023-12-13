import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  assignOrderToDelivery,
  findOrderById,
  findOrderItem,
  findOrders,
  findRepartidores,
  modifiedOrder,
  removeOrder,
  sevedOrder
} from '../../services/orders.service.js';

export const getOrders = async (req, res) => {
  const orders = await findOrders();
  orders.error
    ? getResponse500(res, orders)
    : getResponse200(res, orders, 'ok');
};
export const getOrder = async (req, res) => {
  const { id } = req.params;
  const order = await findOrderById(id);
  order.error
    ? getResponse500(res, order.data.message, res)
    : getResponse200(res, order, 'ok');
};
export const createOrder = async (req, res) => {
  const order = await sevedOrder(req.body);
  order.error
    ? getResponse500(res, order.data.message, res)
    : getResponse200(res, order, 'ok');
};
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const order = await modifiedOrder(id, req.body);
  order.error
    ? getResponse500(res, order.data.message, res)
    : getResponse200(res, order.data, 'ok');
};
export const deleteOrder = async (req, res) => {
  const { id } = req.params;
  const order = await removeOrder(id);
  order.error
    ? getResponse500(res, order.data.message, res)
    : getResponse200(res, order.data, 'ok');
};

export const getRepartidores = async (req, res, next) => {
  try {
    const repartidores = await findRepartidores();
    repartidores.error
      ? getResponse500(res, repartidores.data, res)
      : getResponse200(res, repartidores.data, 'ok');
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getOrderItem = async (req, res, next) => {
  try {
    console.log('🧩 Entre a la funcion te obtener el order Item');
    const { id } = req.params;
    const orderItem = await findOrderItem(id);
    orderItem.error
      ? getResponse500(res, orderItem.data, orderItem.message)
      : getResponse200(res, orderItem.data, 'ok');
  } catch (error) {
    console.log('❌Error', error);
    next(error);
  }
};

export const asignarRepartidor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await assignOrderToDelivery(id, req.body);
    order.error
      ? getResponse500(res, order.data, order.message)
      : getResponse200(res, order.data, 'ok');
  } catch (error) {
    console.log('❌Error', error);
    next(error);
  }
};
