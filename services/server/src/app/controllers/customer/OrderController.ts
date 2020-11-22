import Order from 'collections/Order';
import Customer from 'collections/Customer';
import Product from 'collections/Product';

import { Request, Response } from 'express';
import HttpError from '~/utils/HttpError';

import {
  Customer as ICustomer,
  Product as IProduct,
  WithKeys,
} from 'types/models';

class OrderController {
  async index(req: Request, res: Response): Promise<Response> {
    const customer = req.user as ICustomer & WithKeys;

    const result = await Customer.getCustomerOrders(customer.email);
    return res.json(result.orders);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const customer = req.user as ICustomer & WithKeys;

    if (!customer) throw new HttpError('Unauthorized', 403);

    const address = customer.addresses && customer.addresses[body.address];

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
      address,
      products,
    });
    return res.json(order);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { orderId } = req.params;
    const customer = req.user as ICustomer & WithKeys;

    const order = await Order.getOrder(orderId);
    if (order.order.customerId !== customer.PK)
      throw new HttpError('Unauthorized', 403);
    return res.json(order);
  }
}

export default new OrderController();
