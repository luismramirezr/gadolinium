import Category from 'collections/Category';

import { Request, Response } from 'express';
import Product from '~/app/collections/Product';
import HttpError from '~/utils/HttpError';

class CategoryController {
  async index(req: Request, res: Response): Promise<Response> {
    const { categoryId } = req.params;

    const category = await Category.getCategory(categoryId);

    return res.json(category.products || []);
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
