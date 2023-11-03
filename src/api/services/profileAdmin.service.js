import { PrismaClient } from '@prisma/client';
import { getMessage } from '../../helpers/Messages.js';

const prisma = new PrismaClient();
export const fetchAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return getMessage(false, users, 'Users fetched successfully.');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching users.');
  }
};

export const fetchUserDetails = async (userId) => {
  try {
    const userDetails = await prisma.user.findUnique({ where: { id: userId } });
    return getMessage(false, userDetails, 'User details fetched successfully.');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching user details.');
  }
};

// tramsacciones y ventas
export const fetchAllTransactions = async () => {
  try {
    const transactions = await prisma.transactions.findMany();
    return getMessage(
      false,
      transactions,
      'Transactions fetched successfully.'
    );
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching transactions.');
  }
};

export const fetchTransactionDetails = async (transactionId) => {
  try {
    const transaction = await prisma.transactions.findUnique({
      where: { id: transactionId }
    });
    return getMessage(
      false,
      transaction,
      'Transaction details fetched successfully.'
    );
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error fetching transaction details.'
    );
  }
};
export const fetchAllSales = async () => {
  try {
    const sales = await prisma.sales.findMany();
    return getMessage(false, sales, 'Sales fetched successfully.');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching sales.');
  }
};

export const fetchSaleDetails = async (saleId) => {
  try {
    const sale = await prisma.sales.findUnique({ where: { id: saleId } });
    return getMessage(false, sale, 'Sale details fetched successfully.');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching sale details.');
  }
};
export const fetchSalesStats = async () => {
  try {
    // Aquí harías tu consulta a la base de datos para obtener las estadísticas
    const salesStats = await prisma.sales.findMany(); // Esto es solo un ejemplo
    return getMessage(
      false,
      salesStats,
      'Sales statistics fetched successfully.'
    );
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching sales statistics.');
  }
};
// productos
export const fetchAllProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return getMessage(false, products, 'Products fetched successfully.');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching products.');
  }
};

export const fetchProductDetails = async (productId) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });
    return getMessage(false, product, 'Product details fetched successfully.');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching product details.');
  }
};
// ordenes
export const fetchAllOrders = async () => {
  try {
    const orders = await prisma.order.findMany();
    return getMessage(false, orders, 'Orders fetched successfully.');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching orders.');
  }
};

export const fetchOrderDetails = async (orderId) => {
  try {
    const order = await prisma.order.findUnique({ where: { id: orderId } });
    return getMessage(false, order, 'Order details fetched successfully.');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching order details.');
  }
};

export const fetchPendingOrders = async () => {
  try {
    const pendingOrders = await prisma.order.findMany({
      where: { status: 'PENDING' }
    });
    return getMessage(
      false,
      pendingOrders,
      'Pending orders fetched successfully.'
    );
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching pending orders.');
  }
};

export const fetchCompletedOrders = async () => {
  try {
    const completedOrders = await prisma.order.findMany({
      where: { status: 'COMPLETED' }
    });
    return getMessage(
      false,
      completedOrders,
      'Completed orders fetched successfully.'
    );
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching completed orders.');
  }
};
// estadisticas

export const fetchGeneralStats = async () => {
  try {
    // Aquí puedes hacer varias consultas para obtener diferentes estadísticas y luego combinarlas en un objeto.
    const userCount = await prisma.user.count();
    const productCount = await prisma.product.count();
    // ... otras estadísticas
    const stats = {
      users: userCount,
      products: productCount
      // ... otros datos
    };
    return getMessage(false, stats, 'General statistics fetched successfully.');
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error fetching general statistics.'
    );
  }
};

export const fetchTopProducts = async () => {
  try {
    // Aquí podrías obtener los productos más vendidos o más populares.
    const topProducts = await prisma.product.findMany({
      take: 10,
      orderBy: { sales: 'desc' }
    });
    return getMessage(false, topProducts, 'Top products fetched successfully.');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching top products.');
  }
};

export const fetchTopSellers = async () => {
  try {
    // Aquí podrías obtener los vendedores con las mayores ventas o mejores calificaciones.
    const topSellers = await prisma.seller.findMany({
      take: 10,
      orderBy: { sales: 'desc' }
    });
    return getMessage(false, topSellers, 'Top sellers fetched successfully.');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching top sellers.');
  }
};

export const fetchAllReviews = async () => {
  try {
    const reviews = await prisma.review.findMany();
    return getMessage(false, reviews, 'Reviews fetched successfully.');
  } catch (error) {
    return getMessage(true, error.message, 'Error fetching reviews.');
  }
};

export const fetchReviewsForProduct = async (productId) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { productId }
    });
    return getMessage(
      false,
      reviews,
      'Reviews for product fetched successfully.'
    );
  } catch (error) {
    return getMessage(
      true,
      error.message,
      'Error fetching reviews for product.'
    );
  }
};
