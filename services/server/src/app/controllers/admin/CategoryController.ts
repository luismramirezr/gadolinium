import Category from 'collections/Category';

import { Request, Response } from 'express';
import HttpError from '~/utils/HttpError';

class CategoryController {
  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const result = await Category.createCategory(body);
    return res.json(result);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { slug } = req.params;

    const result = await Category.getCategory(slug);

    if (!result.category) throw new HttpError('Category not found', 404);

    return res.json(result);
  }
}

export default new CategoryController();
