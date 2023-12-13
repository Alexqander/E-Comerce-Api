import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  findAllCategories,
  findAllCategoriesPage,
  findAllCategoriesWithSubcategories,
  findAllSubcategories,
  findAllSubcategoriesPage,
  findSubcategoryByCategory,
  saveCategory,
  saveSubcategory
} from '../../services/categories.service.js';

export const getAllCategories = async (req, res, next) => {
  try {
    const {
      error: errorConsult,
      data: dataConsult,
      message: messageConsult
    } = await findAllCategories();
    return errorConsult
      ? getResponse500(res, { messageConsult, dataConsult })
      : getResponse200(res, dataConsult);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllCategoriesWithSubcategories = async (req, res, next) => {
  try {
    const {
      error: errorConsult,
      data: dataConsult,
      message: messageConsult
    } = await findAllCategoriesWithSubcategories();
    return errorConsult
      ? getResponse500(res, { messageConsult, dataConsult })
      : getResponse200(res, dataConsult);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const {
      error: errorConsult,
      data: dataConsult,
      message: messageConsult
    } = await findAllCategoriesPage(parseInt(page), parseInt(limit));
    return errorConsult
      ? getResponse500(res, { messageConsult, dataConsult })
      : getResponse200(res, dataConsult);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllSubCategories = async (req, res, next) => {
  try {
    const {
      error: errorConsult,
      data: dataConsult,
      message: messageConsult
    } = await findAllSubcategories();
    return errorConsult
      ? getResponse500(res, { messageConsult, dataConsult })
      : getResponse200(res, dataConsult);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSubCategories = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const {
      error: errorConsult,
      data: dataConsult,
      message: messageConsult
    } = await findAllSubcategoriesPage(page, limit);
    return errorConsult
      ? getResponse500(res, { messageConsult, dataConsult })
      : getResponse200(res, dataConsult);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getSubCategoryByCategoryId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      error: errorConsult,
      data: dataConsult,
      message: messageConsult
    } = await findSubcategoryByCategory(parseInt(id));
    return errorConsult
      ? getResponse500(res, { messageConsult, dataConsult })
      : getResponse200(res, dataConsult);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const {
      error: errorConsult,
      data: dataConsult,
      message: messageConsult
    } = await saveCategory(name);
    return errorConsult
      ? getResponse500(res, { messageConsult, dataConsult })
      : getResponse200(res, dataConsult);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const creatSubcategory = async (req, res, next) => {
  try {
    const { name, categoryId, description } = req.body;
    const {
      error: errorConsult,
      data: dataConsult,
      message: messageConsult
    } = await saveSubcategory(name, categoryId, description);
    return errorConsult
      ? getResponse500(res, { messageConsult, dataConsult })
      : getResponse200(res, dataConsult);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
export const updateCategory = async (req, res) => {};
export const deleteCategory = async (req, res) => {};
export const deleteSubCategory = async (req, res) => {};
