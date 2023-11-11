import { prisma } from '../../loaders/database.js';
import { getMessage } from '../../helpers/Messages.js';

export const findAllProductsPage = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const products = await prisma.product.findMany({
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        storeId: true,
        subCategoryId: true,
        SubCategory: {
          select: {
            name: true
          }
        },
        Images: {
          take: 1,
          select: {
            url: true
          }
        }
      }
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

export const findProductById = async (id) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        stock: true,
        storeId: true,
        store: {
          select: {
            name: true
          }
        },
        subCategoryId: true,
        SubCategory: {
          select: {
            name: true
          }
        },
        Images: {
          select: {
            url: true
          }
        },
        Reviews: {
          select: {
            id: true,
            comment: true,
            rating: true,
            user: {
              select: {
                name: true,
                lastName: true,
                profilePicture: true
              }
            }
          }
        }
      }
    });
    return getMessage(false, product, 'successfull operation');
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

export const saveImageProduct = async (imageUrl, productId) => {
  try {
    const newImageProduct = await prisma.images.create({
      data: {
        url: imageUrl,
        productId
      }
    });
    return getMessage(false, newImageProduct, 'successfull operation');
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
