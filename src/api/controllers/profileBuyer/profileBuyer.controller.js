import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  createBillingAddressService,
  createBuyerInfoService,
  createShippingAddressService,
  createShoppingCartService,
  createWishListService,
  deleteShoppingCartService,
  deleteWishListService,
  fetchBuyerInfoService,
  fetchProductsFromShoppingCartService,
  fetchProductsFromWishListService,
  fetchWishListsService,
  updateBuyerInfoService,
  updateShoppingCartService,
  updateWishListService
} from '../../services/profileBuyer.service.js';

// * 1. Información del Comprador
export const getInfoBuyer = async (req, res) => {
  const result = await fetchBuyerInfoService();
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Buyer info fetched successfully');
};

export const createInfoBuyer = async (req, res) => {
  const result = await createBuyerInfoService(req.body); // assuming body contains required data
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Buyer info created successfully');
};

export const updateInfoBuyer = async (req, res) => {
  const result = await updateBuyerInfoService(req.body); // assuming body contains required data
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Buyer info updated successfully');
};

// * 2. Listas de Deseos
export const getInfoWishListsBuyer = async (req, res) => {
  const result = await fetchWishListsService();
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Wish lists fetched successfully');
};

export const createWishListBuyer = async (req, res) => {
  const result = await createWishListService(req.body);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Wish list created successfully');
};

export const updateWishListBuyer = async (req, res) => {
  const result = await updateWishListService(req.body);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Wish list updated successfully');
};

export const deleteWishListBuyer = async (req, res) => {
  const result = await deleteWishListService(req.params.id);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Wish list deleted successfully');
};

export const getInfoProductsWishListBuyer = async (req, res) => {
  const result = await fetchProductsFromWishListService(req.params.id);
  result.error
    ? getResponse500(res, result)
    : getResponse200(
        res,
        result.data,
        'Products from wish list fetched successfully'
      );
};

// * 3. Carrito de Compras
export const getInfoShoppingCartBuyer = async (req, res) => {
  const result = await fetchProductsFromShoppingCartService();
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Shopping cart fetched successfully');
};

export const createShoppingCartBuyer = async (req, res) => {
  const result = await createShoppingCartService(req.body);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Shopping cart created successfully');
};

export const updateShoppingCartBuyer = async (req, res) => {
  const result = await updateShoppingCartService(req.body);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Shopping cart updated successfully');
};

export const deleteShoppingCartBuyer = async (req, res) => {
  const result = await deleteShoppingCartService(req.params.id);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Shopping cart deleted successfully');
};

export const getInfoProductsShoppingCartBuyer = async (req, res) => {
  const result = await fetchProductsFromShoppingCartService(req.params.id);
  result.error
    ? getResponse500(res, result)
    : getResponse200(
        res,
        result.data,
        'Products from shopping cart fetched successfully'
      );
};

// 4. Direcciones
export const createShippingAddressBuyer = async (req, res) => {
  const result = await createShippingAddressService(req.body);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Shipping address created successfully');
};

export const createBillingAddressBuyer = async (req, res) => {
  const result = await createBillingAddressService(req.body);
  result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'Billing address created successfully');
};
