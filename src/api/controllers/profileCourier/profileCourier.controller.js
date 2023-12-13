import {
  getResponse200,
  getResponse404,
  getResponse500
} from '../../../helpers/Responses.js';
import {
  fetchOrdersDelivered,
  fetchOrdersToDeliver,
  updateOrderStatus
} from '../../services/profile.courier.service.js';

// * Obtener los pedidos que tenga que entregar el repartidor
export const getOrdersToDeliver = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await fetchOrdersToDeliver(id); // Asumiendo que el ID del repartidor está en req.user.id
    if (result.error) {
      return getResponse500(res, result);
    }
    return result.data
      ? getResponse200(res, result.data, 'ok')
      : getResponse404(res, 'Orders for courier not found');
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// * Obtener el historial de pedidos que ha repartido un repartidor
export const getOrdersDelivered = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await fetchOrdersDelivered(id); // Asumiendo que el ID del repartidor está en req.user.id
    if (result.error) {
      return getResponse500(res, result);
    }
    return result.data
      ? getResponse200(res, result.data, 'ok')
      : getResponse404(res, 'Orders for courier not found');
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// * Modificar el estado de un pedido
export const modifiedOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { deliveryStatus } = req.body;
    const orderModified = await updateOrderStatus(id, deliveryStatus);
    return getResponse200(res, orderModified, 'ok');
  } catch (error) {
    console.log(error);
    next(error);
  }
};
