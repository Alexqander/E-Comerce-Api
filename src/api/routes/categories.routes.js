import { Router } from 'express';
import {
  creatSubcategory,
  createCategory,
  getCategories,
  getCategoryById,
  getSubCategories,
  getSubCategoryById
} from '../controllers/categories/categories.controller.js';

const router = Router();

router.get('/', getCategories);
router.get('/sub/', getSubCategories);
router.get('/:id', getSubCategoryById);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.post('/sub/', creatSubcategory);
router.put('/:id');
router.delete('/:id');

export default router;
