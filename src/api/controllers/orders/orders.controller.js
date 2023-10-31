import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  findOrderById,
  findOrders,
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
