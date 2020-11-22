import Category from 'collections/Category';

import { Request, Response } from 'express';

class CategoryController {
  async index(_req: Request, res: Response): Promise<Response> {
    const result = await Category.getCategories();
    return res.json(result);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const result = await Category.createCategory(body);
    return res.json(result);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { slug } = req.params;

    const result = await Category.getCategory(slug);

    return res.json(result);
  }
}

export default new CategoryController();
