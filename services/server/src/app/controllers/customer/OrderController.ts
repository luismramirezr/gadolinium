import Order from 'collections/Order';
import Customer from 'collections/Customer';
import Product from 'collections/Product';

import { Request, Response } from 'express';
import HttpError from '~/utils/HttpError';

import { Product as IProduct } from 'types/models';

class OrderController {
  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { email } = req.params;

    const customer = await Customer.getCustomer(email);

    const address = customer.addresses[body.address];

    if (!address) throw new HttpError('Address not found', 404);

    const products: Array<IProduct & { quantity: number }> = await Promise.all(
      body.products.map(async (item: { slug: string; quantity: number }) => {
        const product = await Product.getProduct(item.slug);
        if (!product)
          throw new HttpError(`Product '${item.slug}' not found`, 404);
        if (!product.stock)
          throw new HttpError(`Product '${item.slug}' is out of stock`, 400);
        return { ...product, quantity: item.quantity };
      })
    );

    const totalValue = products.reduce((total, product) => {
      return total + product.value * product.quantity;
    }, 0);

    const createdAt = new Date().toISOString();

    const order = await Order.createOrder(customer.PK, {
      ...body,
      createdAt,
      status: 'PLACED',
      totalValue,
      address: { ...address, name: body.address },
      products,
    });
    return res.json(order);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { orderId } = req.params;

    const order = await Order.getOrder(orderId);
    return res.json(order);
  }

  async showCustomerOrders(req: Request, res: Response): Promise<Response> {
    const { email } = req.params;

    const result = await Customer.getCustomerOrders(email);
    return res.json(result);
  }
}

export default new OrderController();
