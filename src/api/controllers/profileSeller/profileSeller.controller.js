import {
  getResponse200,
  getResponse404,
  getResponse500
} from '../../../helpers/Responses.js';
import {
  createNewProduct,
  createSellerProfileInfo,
  fetchOrdersBySeller,
  fetchProductTransactions,
  fetchSellerProducts,
  fetchSellerProfileInfo,
  fetchStatsSeller,
  removeProduct,
  updateExistingProduct,
  updateOrderStatus,
  updateSellerProfileInfo
} from '../../services/profileSeller.service.js';

export const getInfoProfileSeller = async (req, res) => {
  const { id } = req.params;
  const result = await fetchSellerProfileInfo(id); // Asumiendo que el ID del vendedor está en req.user.id
  if (result.error) {
    return getResponse500(res, result);
  }
  return result.data
    ? getResponse200(res, result.data, 'ok')
    : getResponse404(res, 'Seller profile info not found');
};

export const getStatsSeller = async (req, res) => {
  const { id } = req.params;
  const result = await fetchStatsSeller(id); // Asumiendo que el ID del vendedor está en req.user.id
  if (result.error) {
    return getResponse500(res, result);
  }
  return result.data
    ? getResponse200(res, result.data, 'ok')
    : getResponse404(res, 'Seller profile info not found');
};

export const getInfoProductsSeller = async (req, res) => {
  const { id } = req.params;
  const result = await fetchSellerProducts(id);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'ok');
};
export const getInfoTransactionsProductSeller = async (req, res) => {
  const result = await fetchProductTransactions(req.params.id);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'ok');
};

export const createProductSeller = async (req, res) => {
  const result = await createNewProduct(req.body);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'ok');
};

export const updateProductSeller = async (req, res) => {
  const result = await updateExistingProduct(req.params.id, req.body);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'ok');
};

export const createInfoProfileSeller = async (req, res) => {
  console.log(req.body);
  const result = await createSellerProfileInfo(req.body);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'ok');
};

export const updateInfoProfileSeller = async (req, res) => {
  const result = await updateSellerProfileInfo(req.user.id, req.body);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'ok');
};

export const deleteProductSeller = async (req, res) => {
  const result = await removeProduct(req.params.id);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'ok');
};

// * Enpoints para ver las ordenes de compra de un vendedor

export const getOrdersSeller = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await fetchOrdersBySeller(id);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Seller info fetched successfully');
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// * Cambiar el estado de una orden de compra

export const changeOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await updateOrderStatus(id, status);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Seller info fetched successfully');
  } catch (error) {
    console.log(error);
    next(error);
  }
};
// * Asignar una orden de compra a un repartidor
export const assingOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { sellerId } = req.body;
    const result = await updateOrderStatus(id, sellerId);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Seller info fetched successfully');
  } catch (error) {
    console.log(error);
    next(error);
  }
};
