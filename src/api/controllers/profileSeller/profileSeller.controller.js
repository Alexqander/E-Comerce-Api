import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  createNewProduct,
  createSellerProfileInfo,
  fetchProductTransactions,
  fetchSellerProducts,
  fetchSellerProfileInfo,
  removeProduct,
  updateExistingProduct,
  updateSellerProfileInfo
} from '../../services/profileSeller.service.js';

export const getInfoProfileSeller = async (req, res) => {
  const result = await fetchSellerProfileInfo(req.user.id); // Asumiendo que el ID del vendedor está en req.user.id
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'ok');
};

export const getInfoProductsSeller = async (req, res) => {
  const result = await fetchSellerProducts(req.user.id);
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
