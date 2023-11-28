import { Router } from 'express';

import {
  cancel,
  checkoutSession,
  createSession,
  webHookStripe
} from '../controllers/payment/payment.controller.js';
import bodyParser from 'body-parser';

const router = Router();

//* Checkout
router.post('/create-checkout-session', createSession);
router.post(
  '/webhook-stripe',
  bodyParser.raw({ type: 'application/json' }),
  webHookStripe
);
router.get('/success', checkoutSession);
router.get('/cancel', cancel);

export default router;
