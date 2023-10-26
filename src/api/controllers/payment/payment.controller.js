import Stripe from 'stripe';
import config from '../../../config/index.js';
import { getResponse200 } from '../../../helpers/Responses.js';
const stripe = new Stripe(config.stripe.stripeSecret);

export const createSession = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt'
          },
          unit_amount: 2000
        },
        quantity: 1
      },
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt'
          },
          unit_amount: 2000
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/apiEcomerce/1.0/payment/success',
    cancel_url: 'http://localhost:3000/apiEcomerce/1.0/payment/cancel'
  });
  return getResponse200(res, session, 'session');
};
export const checkoutSession = async (req, res) => {
  return getResponse200(res, { message: 'succesfull operation' }, 'session');
};
export const cancel = async (req, res) => {};
