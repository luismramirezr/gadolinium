import Customer from 'collections/Customer';
import Admin from 'collections/Admin';
import { COOKIE_OPTIONS } from 'config/constants';

import { Request, Response } from 'express';

class SessionController {
  async create(req: Request, res: Response): Promise<Response> {
    const { body } = req;

    const cookieOptions = {
      ...COOKIE_OPTIONS,
      maxAge: body.saveSession ? COOKIE_OPTIONS.maxAge : 0,
    };

    if (body.asAdmin) {
      const { admin, tokens } = await Admin.signIn(body.email, body.password);

      res.cookie('authentication', tokens.sessionToken, cookieOptions);

      return res.json({
        admin,
        tokens: { ...tokens, sessionToken: undefined },
      });
    }

    const { customer, tokens } = await Customer.signIn(
      body.email,
      body.password
    );

    res.cookie('authentication', tokens.sessionToken, cookieOptions);

    return res.json({
      customer,
      tokens: { ...tokens, sessionToken: undefined },
    });
  }

  async show(req: Request, res: Response): Promise<Response> {
    const user = req.user;
    return res.json({ customer: user, isAuth: true });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const user = req.user!;
    if (user.role === 'ADMIN') {
      const { admin, tokens } = await Admin.refreshSession(user.email);
      res.cookie('authentication', tokens.sessionToken);
      return res.json({
        admin,
        tokens: { ...tokens, sessionToken: undefined },
      });
    }
    const { customer, tokens } = await Customer.refreshSession(user.email);

    res.cookie('authentication', tokens.sessionToken);

    return res.json({
      customer,
      tokens: { ...tokens, sessionToken: undefined },
    });
  }
}

export default new SessionController();
