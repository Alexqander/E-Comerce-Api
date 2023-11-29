import { Resend } from 'resend';
import config from './index.js';
import { getMessage } from '../helpers/Messages.js';
const resendInstance = new Resend(config.resend.resendApyKey);
resendInstance.domains.verify('6da95246-a7be-4aff-b681-600d31ae4d8e');

export const sendEmail = async (email, subject, html) => {
  try {
    const response = await resendInstance.emails.send({
      from: 'no reply <noreply@servimahz.com.mx>',
      to: email,
      subject,
      html
    });
    return getMessage(false, response, 'Email sent successfully');
  } catch (error) {
    console.log(error);
    return getMessage(true, error, 'Error sending email');
  }
};
