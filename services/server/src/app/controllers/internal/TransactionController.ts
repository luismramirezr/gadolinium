import { Request, Response } from 'express';
import Transaction from 'collections/Transaction';
import Order from 'collections/Order';

import { PagSeguroTransaction } from 'types/gateway/pagseguro';

class TransactionController {
  async create(req: Request, res: Response): Promise<Response> {
    const transactionData = JSON.parse((req.body as Buffer).toString()) as {
      transaction: PagSeguroTransaction;
    };

    const transaction = await Transaction.getTransaction(
      transactionData.transaction.code
    );

    await Transaction.createTransaction(transaction.orderId, {
      orderId: transaction.orderId,
      transaction: transactionData.transaction,
    });

    const updatedOrder = await Order.updateOrderStatus(
      transaction.orderId,
      Transaction.getTransactionStatusText(transactionData.transaction.status)
    );

    return res.json(updatedOrder);
  }
}

export default new TransactionController();
