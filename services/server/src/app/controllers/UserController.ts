import { NextFunction, Request, Response } from 'express';
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

  async show(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { params } = req;
    try {
      const user = await User.findOrFail({ email: params.email });
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
