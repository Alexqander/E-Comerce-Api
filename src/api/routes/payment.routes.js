import { Router } from 'express';
import {
  cancel,
  checkoutSession,
  createSession
} from '../controllers/payment/payment.controller.js';

const router = Router();

router.get('/create-checkout-session', createSession);
router.get('/success', checkoutSession);
router.get('/cancel', cancel);
export default router;
