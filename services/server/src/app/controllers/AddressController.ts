import { Request, Response } from 'express';
import User from 'collections/User';

class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const { params } = req;
    const { body } = req;

    const user = await User.findOrFail(params.email, true);
    const adresses = user.data.adresses || [];

    if (adresses.some(({ name }) => name === body.name))
      User.validationError(`Address with name '${body.name}' already exists`);

    const main = adresses.findIndex(({ main }) => main);

    if (body.main && main) adresses[main].main = false;

    if (!body.main && !main) body.main = true;

    user.data.adresses = adresses;
    await user.save();
    return res.json(User.removeFields(user));
  }
}

export default new UserController();
