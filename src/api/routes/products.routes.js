import { Router } from 'express';
import { checkAuth } from '../middlewares/auth/auth.js';
import multer from 'multer';
import {
  createProduct,
  getProduct,
  getProducts,
  searchProducts,
  updateProduct,
  uploadProductImage
} from '../controllers/products/products.controller.js';
import { ProductSchema } from '../middlewares/validations/dtos/product.dto.js';
import { validateSchema } from '../middlewares/validations/validationSchemas.js';
import { convertAndValidateProductData } from '../middlewares/validations/convertAndValidateProductData.js';
const router = Router();

// eslint-disable-next-line new-cap

const upload = multer({ storage: multer.memoryStorage() });

router.post(
  '/upload',
  upload.array('images'),
  convertAndValidateProductData,
  validateSchema(ProductSchema),
  uploadProductImage
);
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:id', getProduct);
router.post('/', checkAuth, createProduct);
router.put('/:id', checkAuth, updateProduct);

export default router;
