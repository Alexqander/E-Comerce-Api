import { getMessage } from '../../helpers/Messages.js';
import { prisma } from '../../loaders/database.js';

export const findAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return getMessage(false, categories, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};

export const findAllCategoriesWithSubcategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        SubCategory: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });
    return getMessage(false, categories, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};

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

export const findAllSubcategories = async () => {
  try {
    const subcategories = await prisma.subCategory.findMany({
      select: {
        id: true,
        name: true
      }
    });
    return getMessage(false, subcategories, 'successfull operation');
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

export const findSubcategoryByCategory = async (categoryId) => {
  try {
    const subcategories = await prisma.subCategory.findMany({
      where: {
        categoryId
      },
      select: {
        id: true,
        name: true
      }
    });
    return getMessage(false, subcategories, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};

export const saveCategory = async (name) => {
  try {
    const newCategory = await prisma.category.create({
      data: {
        name
      }
    });
    return getMessage(false, newCategory, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};

export const saveSubcategory = async (name, categoryId, description) => {
  try {
    const newSubcategory = await prisma.subCategory.create({
      data: {
        name,
        categoryId,
        description
      }
    });
    return getMessage(false, newSubcategory, 'successfull operation');
  } catch (error) {
    console.log(error);
    return getMessage(true, null, error);
  }
};
