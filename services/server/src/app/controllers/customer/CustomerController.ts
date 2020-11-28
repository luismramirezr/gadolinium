import Customer from 'collections/Customer';

import { Request, Response } from 'express';
import File from '~/app/collections/File';
import { Customer as ICustomer } from '~/types/models';

class CustomerController {
  async show(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    return res.json(user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const customer = req.user! as ICustomer;
    const { body } = req;

    const updated = await Customer.updateCustomer({
      ...customer,
      ...body,
    });

    if (body.avatar) {
      const file = await File.getFile(body.avatar);
      await Customer.setAvatar(updated.PK, file);
    }
    if (body.avatar === null) {
      await Customer.removeAvatar(updated.PK, customer.avatar);
    }
    return res.json(updated);
  }
}

export default new CustomerController();
