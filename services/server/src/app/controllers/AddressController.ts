import Customer from 'collections/Customer';

import { Request, Response } from 'express';
import HttpError from '~/utils/HttpError';

class CustomerController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;
    const { body } = req;

    const customer = await Customer.getCustomer(email);

    const { addresses = {}, mainAddress } = customer;
    if (addresses[body.name])
      throw new HttpError('Address already exists', 400);

    addresses[body.name] = { ...body, name: undefined, mainAddress: undefined };

    const data = {
      ...customer,
      addresses,
      mainAddress: body.mainAddress || !mainAddress ? body.name : mainAddress,
    };

    const result = await Customer.updateCustomer(data);
    return res.json(result);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { email, name } = req.params;
    const { body } = req;

    const customer = await Customer.getCustomer(email);

    const { addresses, mainAddress } = customer;
    if (!addresses[name]) throw new HttpError('Address does not exist', 404);

    if (body.name) {
      addresses[body.name] = {
        ...addresses[name],
        ...body,
        mainAddress: undefined,
      };
      addresses[name] = undefined;
    } else {
      addresses[name] = { ...addresses[name], ...body, mainAddress: undefined };
    }

    const data = {
      ...customer,
      addresses,
      mainAddress: body.mainAddress ? body.name || name : mainAddress,
    };

    const result = await Customer.updateCustomer(data);
    return res.json(result);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;

    const result = await Customer.getCustomer(email);

    return res.json({ ...result, hashedPassword: undefined });
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    const { email, name } = req.params;

    const customer = await Customer.getCustomer(email);

    const { addresses, mainAddress } = customer;
    if (!addresses[name]) throw new HttpError('Address does not exist', 404);
    if (mainAddress === name)
      throw new HttpError(
        'This address can not be deleted because is the main address',
        400
      );

    const data = {
      ...customer,
      addresses: { ...addresses, [name]: undefined },
    };
    if (
      !Object.keys(data.addresses).some(
        (key) => data.addresses[key] !== undefined
      )
    )
      throw new HttpError(
        'This address can not be deleted because is the last one',
        400
      );

    const result = await Customer.updateCustomer(data);
    return res.json(result);
  }
}

export default new CustomerController();
