import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  createProfileInfo,
  fetchAssignedOrders,
  fetchProfileInfo,
  modifyAssignedOrder,
  modifyProfileInfo
} from '../../services/profile.courier.service.js';

export const getInfoProfile = async (req, res) => {
  const profile = await fetchProfileInfo(req.userId);
  profile.error
    ? getResponse500(res, profile)
    : getResponse200(res, profile.data, 'Profile info retrieved successfully');
};

export const createInfoProfile = async (req, res) => {
  const profile = await createProfileInfo(req.userId, req.body);
  profile.error
    ? getResponse500(res, profile)
    : getResponse200(res, profile.data, 'Profile info created successfully');
};

export const updateInfoProfile = async (req, res) => {
  const updatedProfile = await modifyProfileInfo(req.userId, req.body);
  updatedProfile.error
    ? getResponse500(res, updatedProfile)
    : getResponse200(
        res,
        updatedProfile.data,
        'Profile info updated successfully'
      );
};

export const getInfoOrdersAsigned = async (req, res) => {
  const orders = await fetchAssignedOrders(req.userId);
  orders.error
    ? getResponse500(res, orders)
    : getResponse200(
        res,
        orders.data,
        'Assigned orders retrieved successfully'
      );
};

export const updateOrderAsigned = async (req, res) => {
  const updatedOrder = await modifyAssignedOrder(
    req.userId,
    req.params.id,
    req.body
  );
  updatedOrder.error
    ? getResponse500(res, updatedOrder)
    : getResponse200(
        res,
        updatedOrder.data,
        'Assigned order updated successfully'
      );
};
