import { Router } from 'express';
import {
  creatSubcategory,
  createCategory,
  getAllCategories,
  getAllSubCategories,
  getCategories,
  getCategoryById,
  getSubCategories,
  getSubCategoryByCategoryId
} from '../controllers/categories/categories.controller.js';
import { SubCategorySchemaCreate } from '../middlewares/validations/dtos/categories.dto.js';
import { validateSchema } from '../middlewares/validations/validationSchemas.js';
const router = Router();

router.get('/', getCategories);
router.get('/all', getAllCategories);
router.get('/sub/', getSubCategories);
router.get('/sub/all', getAllSubCategories);
router.get('/sub/:id', getSubCategoryByCategoryId);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.post('/sub/', validateSchema(SubCategorySchemaCreate), creatSubcategory);
router.put('/:id');
router.delete('/:id');

export default router;
