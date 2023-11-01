import { Router } from 'express';
import { checkAuth } from '../middlewares/auth/auth.js';
import multer from 'multer';
import {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  uploadProductImage
} from '../controllers/products/products.controller.js';
const router = Router();

// eslint-disable-next-line new-cap
const storage = new multer.memoryStorage();
const upload = multer({ storage });

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', checkAuth, createProduct);
router.put('/:id', checkAuth, updateProduct);
router.post('/upload', upload.single('file'), uploadProductImage);

export default router;
