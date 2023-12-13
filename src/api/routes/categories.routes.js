import { Router } from 'express';
import {
  creatSubcategory,
  createCategory,
  getAllCategories,
  getAllCategoriesWithSubcategories,
  getAllSubCategories,
  getCategories,
  getSubCategories,
  getSubCategoryByCategoryId
} from '../controllers/categories/categories.controller.js';
import { SubCategorySchemaCreate } from '../middlewares/validations/dtos/categories.dto.js';
import { validateSchema } from '../middlewares/validations/validationSchemas.js';
const router = Router();

router.get('/', getCategories);
router.get('/all', getAllCategories);
router.get('/sub/', getSubCategories);
router.get('/with/all', getAllCategoriesWithSubcategories);
router.get('/sub/all', getAllSubCategories);
router.get('/sub/:id', getSubCategoryByCategoryId);
router.post('/', createCategory);
router.post('/sub/', validateSchema(SubCategorySchemaCreate), creatSubcategory);
router.put('/:id');
router.delete('/:id');

export default router;
