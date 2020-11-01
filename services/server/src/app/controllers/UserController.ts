import { Request, Response } from 'express';
import User from 'collections/User';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const user = {
      email: body.email,
      name: body.name,
      profile: {
        type: 'user',
      },
    };

    const result = await User.create(user);
    return res.json(result);
  }

  async show(req: Request, res: Response): Promise<Response> {
    const { params } = req;
    const user = await User.find({ email: params.email });
    return res.json(user);
  }
}

export default new UserController();
