import { Request, Response } from 'express';
import User from 'collections/User';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const result = await User.create(body);
    return res.json(result);
  }

  async show(req: Request, res: Response): Promise<Response | void> {
    const { params } = req;
    const user = await User.findOrFail(params.email);

    return res.json(user);
  }
}

export default new UserController();
