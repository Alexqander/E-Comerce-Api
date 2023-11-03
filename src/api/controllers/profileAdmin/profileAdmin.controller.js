import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  fetchAllOrders,
  fetchAllProducts,
  fetchAllReviews,
  fetchAllTransactions,
  fetchAllUsers,
  fetchCompletedOrders,
  fetchGeneralStats,
  fetchOrderDetails,
  fetchPendingOrders,
  fetchProductDetails,
  fetchReviewsForProduct,
  fetchSalesStats,
  fetchTopProducts,
  fetchTopSellers,
  fetchTransactionDetails,
  fetchUserDetails
} from '../../services/profileAdmin.service.js';

// funciones para usuarios
export const getAllUsers = async (req, res) => {
  const result = await fetchAllUsers();
  return result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'All users fetched successfully.');
};

export const getUserDetails = async (req, res) => {
  const userId = req.params.id;
  const result = await fetchUserDetails(userId);
  return result.error
    ? getResponse500(res, result)
    : getResponse200(res, result.data, 'User details fetched successfully.');
};
export const getAllSellers = async (req, res) => {};
export const getAllCouriers = async (req, res) => {};
// funciones para transacciones y ventas
export const getAllTransactions = async (req, res) => {
  const result = await fetchAllTransactions();
  return result.error
    ? getResponse500(res, result)
    : getResponse200(
        res,
        result.data,
        'All transactions fetched successfully.'
      );
};

export const getTransactionDetails = async (req, res) => {
  const transactionId = req.params.id;
  const result = await fetchTransactionDetails(transactionId);
  return result.error
    ? getResponse500(res, result)
    : getResponse200(
        res,
        result.data,
        'Transaction details fetched successfully.'
      );
};
export const getSalesStats = async (req, res) => {
  const stats = await fetchSalesStats();
  return stats.error
    ? getResponse500(res, stats)
    : getResponse200(res, stats.data, 'Sales statistics fetched successfully.');
};

// funciones para productos
export const getAllProducts = async (req, res) => {
  const products = await fetchAllProducts();
  return products.error
    ? getResponse500(res, products)
    : getResponse200(res, products.data, 'All products fetched successfully.');
};

export const getProductDetails = async (req, res) => {
  const productId = req.params.id;
  const productDetails = await fetchProductDetails(productId);
  return productDetails.error
    ? getResponse500(res, productDetails)
    : getResponse200(
        res,
        productDetails.data,
        'Product details fetched successfully.'
      );
};

// funciones para ordenes
export const getAllOrders = async (req, res) => {
  const orders = await fetchAllOrders();
  return orders.error
    ? getResponse500(res, orders)
    : getResponse200(res, orders.data, 'All orders fetched successfully.');
};

export const getOrderDetails = async (req, res) => {
  const orderId = req.params.id;
  const orderDetails = await fetchOrderDetails(orderId);
  return orderDetails.error
    ? getResponse500(res, orderDetails)
    : getResponse200(
        res,
        orderDetails.data,
        'Order details fetched successfully.'
      );
};

export const getPendingOrders = async (req, res) => {
  const pendingOrders = await fetchPendingOrders();
  return pendingOrders.error
    ? getResponse500(res, pendingOrders)
    : getResponse200(
        res,
        pendingOrders.data,
        'Pending orders fetched successfully.'
      );
};

export const getCompletedOrders = async (req, res) => {
  const completedOrders = await fetchCompletedOrders();
  return completedOrders.error
    ? getResponse500(res, completedOrders)
    : getResponse200(
        res,
        completedOrders.data,
        'Completed orders fetched successfully.'
      );
};

// funciones para estadisticas generales
export const getGeneralStats = async (req, res) => {
  const generalStats = await fetchGeneralStats();
  return generalStats.error
    ? getResponse500(res, generalStats)
    : getResponse200(
        res,
        generalStats.data,
        'General statistics fetched successfully.'
      );
};

export const getTopProducts = async (req, res) => {
  const topProducts = await fetchTopProducts();
  return topProducts.error
    ? getResponse500(res, topProducts)
    : getResponse200(
        res,
        topProducts.data,
        'Top products fetched successfully.'
      );
};

export const getTopSellers = async (req, res) => {
  const topSellers = await fetchTopSellers();
  return topSellers.error
    ? getResponse500(res, topSellers)
    : getResponse200(res, topSellers.data, 'Top sellers fetched successfully.');
};

export const getAllReviews = async (req, res) => {
  const reviews = await fetchAllReviews();
  return reviews.error
    ? getResponse500(res, reviews)
    : getResponse200(res, reviews.data, 'All reviews fetched successfully.');
};

export const getReviewsForProduct = async (req, res) => {
  const productId = req.params.id;
  const productReviews = await fetchReviewsForProduct(productId);
  return productReviews.error
    ? getResponse500(res, productReviews)
    : getResponse200(
        res,
        productReviews.data,
        'Reviews for product fetched successfully.'
      );
};
