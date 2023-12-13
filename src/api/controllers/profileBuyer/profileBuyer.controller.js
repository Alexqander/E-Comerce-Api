import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  addProductsToShoppingCart,
  createBillingAddressService,
  createBuyerInfoService,
  createShippingAddressService,
  createShoppingCartService,
  createWishList,
  deleteProductFromShoppingCart,
  deleteShoppingCartService,
  deleteWishListService,
  fetchBuyerInfoService,
  fetchProductsFromWishListService,
  findLastShoppingCart,
  updateBuyerInfoService,
  updateShoppingCartService,
  updateWishListService,
  findShoppingCart,
  fetchOrdersByBuyer,
  fetchOrderById,
  addProductReview
} from '../../services/profileBuyer.service.js';
import {
  fetchLastWishList,
  saveProductToWishList,
  deleteProductFromWishList
} from '../../services/wishList.service.js';

// * 1. Información del Comprador
export const getInfoBuyer = async (req, res) => {
  try {
    const result = await fetchBuyerInfoService();
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Buyer info fetched successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const createInfoBuyer = async (req, res) => {
  try {
    const result = await createBuyerInfoService(req.body); // assuming body contains required data
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Buyer info created successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const updateInfoBuyer = async (req, res) => {
  try {
    const result = await updateBuyerInfoService(req.body); // assuming body contains required data
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Buyer info updated successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

// * 2. Listas de Deseos

// ? Obtener la ultima lista de deseos
export const getInfoWishListsBuyer = async (req, res) => {
  try {
    const result = await fetchLastWishList();
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Wish lists fetched successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};
// ? Crea una lista de deseos
export const createWishListBuyer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await createWishList(id);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Wish list created successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};
// ? Agrega un producto a la lista de deseos

export const addProductToWishList = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { products } = req.body;
    const result = await saveProductToWishList(id, products);
    result.error
      ? getResponse500(res, result)
      : getResponse200(
          res,
          result.data,
          'Product added to wish list successfully'
        );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const removeProductFromWishList = async (req, res) => {
  try {
    const { id } = req.params;
    const { products } = req.body;
    const result = await deleteProductFromWishList(id, products);
    result.error
      ? getResponse500(res, result)
      : getResponse200(
          res,
          result.data,
          'Product removed from wish list successfully'
        );
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const updateWishListBuyer = async (req, res) => {
  try {
    const result = await updateWishListService(req.body);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Wish list updated successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const deleteWishListBuyer = async (req, res) => {
  try {
    const result = await deleteWishListService(req.params.id);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Wish list deleted successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const getInfoProductsWishListBuyer = async (req, res) => {
  try {
    const result = await fetchProductsFromWishListService(req.params.id);
    result.error
      ? getResponse500(res, result)
      : getResponse200(
          res,
          result.data,
          'Products from wish list fetched successfully'
        );
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

// * 3. Carrito de Compras

export const getLastShoppingCart = async (req, res) => {
  // * Se busca el ultimo carrito de compras activo por el id de usuario

  try {
    const result = await findLastShoppingCart(req.params.id);
    result.error
      ? getResponse500(res, result.data)
      : getResponse200(
          res,
          result.data,
          'Last shopping cart fetched successfully'
        );
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const getShoppingCart = async (req, res) => {
  try {
    const result = await findShoppingCart(req.params.id);
    result.error
      ? getResponse500(res, result.data)
      : getResponse200(res, result.data, 'Shopping cart fetched successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const createShoppingCartBuyer = async (req, res) => {
  try {
    const result = await createShoppingCartService(req.body);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Shopping cart created successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const savedProductsToShoppingCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { products } = req.body;
    const result = await addProductsToShoppingCart(id, products);
    result.error
      ? getResponse500(res, result)
      : getResponse200(
          res,
          result.data,
          'Product added to shopping cart successfully'
        );
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const createAndAddProductsToShoppingCart = async (req, res) => {
  try {
    const result = await createShoppingCartService(req.body);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Shopping cart created successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const removeProductToShopingCart = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteProductFromShoppingCart(id, req.body);
    result.error
      ? getResponse500(res, result)
      : getResponse200(
          res,
          result.data,
          'Product removed from wish list successfully'
        );
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const updateShoppingCartBuyer = async (req, res) => {
  try {
    const result = await updateShoppingCartService(req.body);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Shopping cart updated successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const deleteShoppingCart = async (req, res) => {
  try {
    const result = await deleteShoppingCartService(req.params.id);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Shopping cart deleted successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

// * Ordenes de compra
// * Endpoint para consultar una orden de compra por el id del cliente
export const getOrdersBuyer = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await fetchOrdersByBuyer(id);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Buyer info fetched successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await fetchOrderById(id);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Buyer info fetched successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

// * 4. Direcciones
export const createShippingAddressBuyer = async (req, res) => {
  try {
    const result = await createShippingAddressService(req.body);
    result.error
      ? getResponse500(res, result)
      : getResponse200(
          res,
          result.data,
          'Shipping address created successfully'
        );
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const createBillingAddressBuyer = async (req, res) => {
  try {
    const result = await createBillingAddressService(req.body);
    result.error
      ? getResponse500(res, result)
      : getResponse200(
          res,
          result.data,
          'Billing address created successfully'
        );
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

// * 5. Reviews
export const createProductReview = async (req, res) => {
  try {
    const result = await addProductReview(req.body);
    result.error
      ? getResponse500(res, result)
      : getResponse200(res, result.data, 'Review created successfully');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};
