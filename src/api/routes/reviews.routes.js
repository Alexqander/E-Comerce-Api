import { Router } from 'express';
import {
  createReview,
  deleteReview,
  getReviewsByProduct,
  getReviewsByUser,
  updateReview
} from '../controllers/reviews/reviews.controller.js';

const router = Router();

router.get('/product/:id', getReviewsByProduct);
router.get('/user/:id', getReviewsByUser);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

export default router;
