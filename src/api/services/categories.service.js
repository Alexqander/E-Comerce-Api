import { getMessage } from '../../helpers/Messages.js';
import { prisma } from '../../loaders/database.js';

export const findAllCategoriesPage = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const categories = await prisma.category.findMany({
      skip,
      take: limit
    });
    const totalCategories = await prisma.category.count();
    return getMessage(
      false,
      { categories, totalPages: Math.ceil(totalCategories / limit) },
      'successfull operation'
    );
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
export const findAllSubcategoriesPage = async (page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const subcategories = await prisma.subCategory.findMany({
      skip,
      take: limit
    });
    const totalSubcategories = await prisma.subCategory.count();
    return getMessage(
      false,
      { subcategories, totalPages: Math.ceil(totalSubcategories / limit) },
      'successfull operation'
    );
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
