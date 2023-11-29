/* import { prisma } from '../../loaders/database.js';
import { getMessage } from '../../helpers/Messages.js'; */

/* export const createTransaction = async (data) => {
  const { idStripe,  products } = data;
  try {
    // * Creo los TransactionItems
    const transactionItems = await prisma.transactionItem.createMany({
      data: products.map((product) => {
        return {
          quantity: product.quantity,
          productId: product.Product.id,
          transactionId: idStripe
        };
      })
    });

    const transaction = await prisma.transactions.create({
      data: {
        ...data
      }
    });
  } catch (error) {
    return getMessage(true, error.message, 'Error creating transaction');
  }
};
 */
