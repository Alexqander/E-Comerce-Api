import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  findAllCategoriesPage,
  findAllSubcategoriesPage
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
export const createCategory = async (req, res) => {};
export const creatSubcategory = async (req, res) => {};
export const updateCategory = async (req, res) => {};
export const deleteCategory = async (req, res) => {};
export const deleteSubCategory = async (req, res) => {};
