import { Request, Response } from 'express';
import Transaction from 'collections/Transaction';
import { Transaction as ITransaction } from '~/types/models';

class TransactionController {
  async create(req: Request, res: Response): Promise<Response> {
    const transaction: ITransaction = req.body;
    const { orderId } = transaction;
    await Transaction.createTransaction(orderId, transaction);
    return res.json(transaction);
  }
}

export default new TransactionController();
