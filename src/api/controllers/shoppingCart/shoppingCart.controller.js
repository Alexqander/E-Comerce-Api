import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  findShoppingCartByUserId,
  modificadeShoppingCart,
  removeShoppingCart
} from '../../services/shoppingCart.service.js';

export const getShoppingCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const shoppingCart = await findShoppingCartByUserId(userId);
    return shoppingCart.error
      ? getResponse500(res, shoppingCart.message)
      : getResponse200(res, shoppingCart.data);
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const createShoppingCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const shoppingCart = await findShoppingCartByUserId(userId);
    return shoppingCart.error
      ? getResponse500(res, shoppingCart.message)
      : getResponse200(res, shoppingCart.data);
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};
export const updateShoppingCart = async (req, res) => {
  const { userId } = req.params;
  const { products } = req.body;
  try {
    const shoppingCart = await modificadeShoppingCart(userId, products);
    return shoppingCart.error
      ? getResponse500(res, shoppingCart.message)
      : getResponse200(res, shoppingCart.data);
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};
export const deleteShoppingCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const shoppingCart = await removeShoppingCart(userId);
    return shoppingCart.error
      ? getResponse500(res, shoppingCart.message)
      : getResponse200(res, shoppingCart.data);
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};
