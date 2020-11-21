import Customer from 'collections/Customer';

import { Request, Response } from 'express';
import HttpError from '~/utils/HttpError';

class CustomerController {
  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const result = await Customer.createCustomer(body);
    return res.json(result);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;

    const result = await Customer.getCustomer(email);

    if (!result.Item) throw new HttpError('Customer not found', 404);

    return res.json({ ...result.Item, hashedPassword: undefined });
  }
}

export default new CustomerController();
