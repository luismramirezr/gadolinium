import Customer from 'collections/Customer';

import { Request, Response } from 'express';
import { Customer as ICustomer, WithKeys } from '~/types/models';
import HttpError from '~/utils/HttpError';

class CustomerController {
  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const customer = req.user as ICustomer & WithKeys;

    const { addresses = {}, mainAddress } = customer;
    if (addresses[body.slug])
      throw new HttpError('Address already exists', 400);

    addresses[body.slug] = { ...body, mainAddress: undefined };

    const data = {
      ...customer,
      addresses,
      mainAddress: body.mainAddress || !mainAddress ? body.slug : mainAddress,
    };

    const result = await Customer.updateCustomer(data);
    return res.json(result);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { slug } = req.params;
    const { body } = req;

    const customer = req.user as ICustomer & WithKeys;

    const { addresses, mainAddress } = customer;
    if (!addresses[slug]) throw new HttpError('Address does not exist', 404);

    if (body.slug) {
      addresses[body.slug] = {
        ...addresses[slug],
        ...body,
        mainAddress: undefined,
      };
      addresses[slug] = undefined;
    } else {
      addresses[slug] = { ...addresses[slug], ...body, mainAddress: undefined };
    }

    const data = {
      ...customer,
      addresses,
      mainAddress: body.mainAddress ? body.slug || slug : mainAddress,
    };

    const result = await Customer.updateCustomer(data);
    return res.json(result);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { slug } = req.params;
    const customer = req.user as ICustomer & WithKeys;

    const address = customer.addresses ? customer.addresses[slug] : undefined;
    if (!address) throw new HttpError('Address not found', 404);

    return res.json(address);
  }

  async destroy(req: Request, res: Response): Promise<Response> {
    const { slug } = req.params;
    const customer = req.user as ICustomer & WithKeys;

    const { addresses, mainAddress } = customer;
    if (!addresses[slug]) throw new HttpError('Address not found', 404);
    if (mainAddress === slug)
      throw new HttpError(
        'This address can not be deleted because is the main address',
        400
      );

    if (Object.keys(addresses).length === 1)
      throw new HttpError(
        'This address can not be deleted because is the last one',
        400
      );

    const data = {
      ...customer,
      addresses: { ...addresses, [slug]: undefined },
    };

    const result = await Customer.updateCustomer(data);
    return res.json(result);
  }
}

export default new CustomerController();
