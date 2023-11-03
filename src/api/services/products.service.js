import { PrismaClient } from '@prisma/client';
import { getMessage } from '../../helpers/Messages';

const prisma = new PrismaClient();

export const findAllProductsPage = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const products = await prisma.product.findMany({
      skip,
      take: limit
    });
    const totalProducts = await prisma.product.count();
    return getMessage(
      false,
      { products, totalPages: Math.ceil(totalProducts / limit) },
      'successfull operation'
    );
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
export const saveProduct = async (product) => {
  try {
    const newProduct = await prisma.product.create({
      data: product
    });
    return getMessage(false, newProduct, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
export const findProductsByVendor = async (vendorId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  try {
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      where: {
        vendorId
      }
    });

    const totalProducts = await prisma.product.count({
      where: {
        vendorId
      }
    });

    return getMessage(
      false,
      { products, totalPages: Math.ceil(totalProducts / limit) },
      'successfull operation'
    );
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
export const updateProduct = async (id, product) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id
      },
      data: product
    });
    return getMessage(false, updatedProduct, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
export const removeProduct = async (id) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id
      }
    });
    return getMessage(false, deletedProduct, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
