import Category from 'collections/Category';

import { Request, Response } from 'express';
import Product from '~/app/collections/Product';
import HttpError from '~/utils/HttpError';

class CategoryController {
  async create(req: Request, res: Response): Promise<Response> {
    const { category } = req.params;
    const { body } = req;

    const categoryExists = await Category.categoryExists(category);

    if (!categoryExists) throw new HttpError('Category not found', 404);

    const result = await Product.createProduct(body);
    return res.json(result);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { category, slug } = req.params;

    if (category) {
      const categoryExists = await Category.categoryExists(category);
      if (!categoryExists) throw new HttpError('Category not found', 404);
    }

    const product = await Product.getProduct(slug);

    return res.json(product);
  }
}

export default new CategoryController();
