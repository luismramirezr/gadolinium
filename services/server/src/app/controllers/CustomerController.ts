import Customer from 'collections/Customer';

import { Request, Response } from 'express';

class CustomerController {
  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const result = await Customer.createCustomer(body);
    return res.json(result);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;

    const customer = await Customer.getCustomer(email);

    return res.json({ ...customer, hashedPassword: undefined });
  }
}

export default new CustomerController();
