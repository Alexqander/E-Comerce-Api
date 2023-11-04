import { Router } from 'express';
import {
  getStoreInfo,
  getStores
} from '../controllers/stores/stores.controller.js';

const router = Router();

router.get('/', getStores);
router.get('/:id', getStoreInfo);

export default router;
