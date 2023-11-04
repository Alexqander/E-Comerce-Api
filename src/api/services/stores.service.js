import { getMessage } from '../../helpers/Messages.js';
import { prisma } from '../../loaders/database.js';

export const findAllStoresPage = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const stores = await prisma.store.findMany({
      skip,
      take: limit
    });
    const totalStores = await prisma.store.count();
    return getMessage(
      false,
      { stores, totalPages: Math.ceil(totalStores / limit) },
      'successfull operation'
    );
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};

export const findStoreInfo = async (storeId) => {
  try {
    const storeInfo = await prisma.store.findUnique({
      where: {
        id: storeId
      },
      include: {
        products: {
          include: {
            Images: true
          }
        }
      }
    });

    return getMessage(false, storeInfo, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
