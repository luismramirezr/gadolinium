import { Request, Response } from 'express';
import Category from 'collections/Category';

class CategoryController {
  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const result = await Category.create(body);
    return res.json(result);
  }
}

export default new CategoryController();
