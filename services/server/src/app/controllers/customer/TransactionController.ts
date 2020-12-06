import Order from 'collections/Order';
import Transaction from 'collections/Transaction';

import { makePayment } from 'services/paymentService';
import { parseFormData } from 'utils/parsePaymentForm';

import { Request, Response } from 'express';
import { Customer } from 'types/models';
import HttpError from '~/utils/HttpError';

class PaymentController {
  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { orderId } = req.params;
    const customer = req.user as Customer;

    try {
      const { order, products } = await Order.getOrder(orderId);

      const paymentData = parseFormData(body, order, products, customer);

      const payment = await makePayment(paymentData);
      const transaction = await Transaction.createTransaction(orderId, {
        orderId,
        transaction: payment,
      });

      return res.json(transaction);
    } catch (error) {
      console.log(error);
      throw new HttpError(error.message, 500);
    }
  }
}

export default new PaymentController();
