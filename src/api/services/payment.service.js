import { sendEmail } from '../../config/resend.js';

export const fullFillOrder = async (session) => {
  console.log('Fullfilling order', session);
};

export const createOrder = async (session) => {
  console.log('Creating order', session);
};

export const sendEmailToBuyer = async (session) => {
  const htmlContent = '<h1 style="color:red;">Order completed</h1>';
  const response = await sendEmail(
    session.customer_details.email,
    'Order completed',
    htmlContent
  );
  console.log('🚀 Entre a enviar el email');
  console.log('Sending email to buyer', response);
};
