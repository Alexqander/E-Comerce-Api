import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  findAllCategoriesPage,
  findAllSubcategoriesPage,
  saveCategory,
  saveSubcategory
} from '../../services/categories.service.js';

export const getCategories = async (req, res) => {
  const { page, limit } = req.query;
  const {
    error: errorConsult,
    data: dataConsult,
    message: messageConsult
  } = await findAllCategoriesPage(page, limit);
  return errorConsult
    ? getResponse500(res, { messageConsult, dataConsult })
    : getResponse200(res, dataConsult);
};
export const getSubCategories = async (req, res) => {
  const { page, limit } = req.query;
  const {
    error: errorConsult,
    data: dataConsult,
    message: messageConsult
  } = await findAllSubcategoriesPage(page, limit);
  return errorConsult
    ? getResponse500(res, { messageConsult, dataConsult })
    : getResponse200(res, dataConsult);
};
export const getSubCategoryById = async (req, res) => {};
export const getCategoryById = async (req, res) => {};
export const createCategory = async (req, res) => {
  const { name } = req.body;
  const {
    error: errorConsult,
    data: dataConsult,
    message: messageConsult
  } = await saveCategory(name);
  return errorConsult
    ? getResponse500(res, { messageConsult, dataConsult })
    : getResponse200(res, dataConsult);
};
export const creatSubcategory = async (req, res) => {
  const { name, categoryId, description } = req.body;
  const {
    error: errorConsult,
    data: dataConsult,
    message: messageConsult
  } = await saveSubcategory(name, categoryId, description);
  return errorConsult
    ? getResponse500(res, { messageConsult, dataConsult })
    : getResponse200(res, dataConsult);
};
export const updateCategory = async (req, res) => {};
export const deleteCategory = async (req, res) => {};
export const deleteSubCategory = async (req, res) => {};
