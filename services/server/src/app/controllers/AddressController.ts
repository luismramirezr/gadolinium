import { Request, Response } from 'express';
import Address from '../collections/Address';

class AddressController {
  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const address = {
      userId: body.userId,
      street: body.street,
    };

    const result = await Address.create(address);
    return res.json(result);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { params } = req;
    const addresses = await Address.findChildren(params.userId);
    return res.json(addresses);
  }
}

export default new AddressController();
