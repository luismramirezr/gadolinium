import Customer from 'collections/Customer';
import Admin from 'collections/Admin';
// import { COOKIE_OPTIONS } from 'config/constants';

import { Request, Response } from 'express';

class CustomerController {
  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    if (body.asAdmin) {
      const { admin, tokens } = await Admin.signIn(body.email, body.password);

      res.cookie('authentication', tokens.sessionToken);

      return res.json({
        admin,
        tokens: { ...tokens, sessionToken: undefined },
      });
    }

    const { customer, tokens } = await Customer.signIn(
      body.email,
      body.password
    );

    res.cookie('authentication', tokens.sessionToken);

    return res.json({
      customer,
      tokens: { ...tokens, sessionToken: undefined },
    });
  }
}

export default new CustomerController();
