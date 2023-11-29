/* eslint-disable no-case-declarations */
import Stripe from 'stripe';
import config from '../../../config/index.js';
import { getResponse200, getResponse500 } from '../../../helpers/Responses.js';
import {
  findShoppingCart,
  updateShoppingCart
} from '../../services/profileBuyer.service.js';
import {
  createOrder,
  fullFillOrder,
  sendEmailToBuyer
} from '../../services/payment.service.js';
const stripe = new Stripe(config.stripe.stripeSecret);

export const createSession = async (req, res) => {
  const { cartId, buyerId } = req.body;

  try {
    // * Obtengo el carrito de compras para obtener los productos
    const cartShopping = await findShoppingCart(cartId);
    if (cartShopping.error) {
      return getResponse500(res, cartShopping.data);
    }
    // * Obtengo los productos del carrito de compras
    const products = cartShopping.data.cartItems;

    // * Modifico los productos para que sean aceptados por stripe
    const productsStripe = products.map((product) => {
      return {
        price_data: {
          currency: 'mxn',
          unit_amount: product.Product.price * 100,
          product_data: {
            name: product.Product.name,
            images: [product.Product.Images[0].url]
          }
        },
        quantity: product.quantity
      };
    });
    // ? Creo la sesion de pago
    const session = await stripe.checkout.sessions.create({
      line_items: productsStripe,
      mode: 'payment',
      // * aqui guardo el id del carrito de compras
      client_reference_id: cartId,
      // * aqui guardo el id del comprador
      customer: buyerId,
      shipping_address_collection: {
        allowed_countries: ['MX']
      },
      success_url: 'http://localhost:3000/shop/checkout/success',
      cancel_url: 'http://localhost:4000/apiEcomerce/1.0/payment/cancel'
    });

    // ? Actualizo el estado del carrito de compras
    const updateShoppingCartStatus = await updateShoppingCart(
      cartId,
      'pending_payment'
    );

    // ? Verifico si hubo un error al actualizar el estado del carrito de compras
    if (updateShoppingCartStatus.error) {
      return getResponse500(res, updateShoppingCartStatus.data);
    }

    return getResponse200(res, session.url, 'session');
  } catch (error) {
    console.log(error);
    return getResponse500(res, error);
  }
};

export const webHookStripe = async (req, res) => {
  const payload = req.body;
  const sig = req.headers['stripe-signature'];
  let event;
  const webhookSecret = config.stripe.stripeWebhookSecret;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, webhookSecret);
  } catch (err) {
    console.error(`❌ Error en webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log('✅ Success:', event.id);
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await createOrder(session);
      await sendEmailToBuyer(session);
      if (session.payment_status === 'paid') {
        const sessionAsync = event.data.object;
        console.log('📦 Entre al evento de que el pedido se pago');
        await fullFillOrder(sessionAsync);
      }
      break;
    case 'checkout.session.async_payment_succeeded':
      const sessionAsync = event.data.object;
      await fullFillOrder(sessionAsync);
      break;
    case 'checkout.session.async_payment_failed':
      const sessionAsyncFailed = event.data.object;
      await fullFillOrder(sessionAsyncFailed);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  console.log('payload:', payload);
  return res.status(200).send();
};
export const checkoutSession = async (req, res) => {
  return getResponse200(res, { message: 'succesfull operation' }, 'session');
};
export const cancel = async (req, res) => {};
