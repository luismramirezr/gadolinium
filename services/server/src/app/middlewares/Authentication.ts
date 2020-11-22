import HttpError from '~/utils/HttpError';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import getRsaKey from 'utils/getRsaKey';
import { UserAuth } from 'types/models';
import Admin from '../collections/Admin';
import Customer from '../collections/Customer';

export const authentication = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  if (!cookies?.authentication) next(new HttpError('Unauthorized', 403));
  if (!req.headers.authorization)
    return next(new HttpError('Unauthorized', 403));
  const { authentication } = cookies;

  const rsa = await getRsaKey();

  // Phase 1 //

  try {
    const payload = jwt.verify(authentication, rsa) as UserAuth;
    if (payload) {
      const user =
        payload.role === 'ADMIN'
          ? await Admin.getAdmin(payload.email)
          : await Customer.getCustomer(payload.email);
      req.user = user;

      // Phase 2 //

      const { authorization } = req.headers;
      const token = authorization.split(' ').pop();

      if (!token) return next(new HttpError('Unauthorized', 403));

      try {
        const payload = jwt.verify(token, rsa) as string;
        if (payload && payload === req.cookies?.authentication) return next();
        throw Error('Empty token');
      } catch (e) {
        console.log(e);
        return next(new HttpError('Unauthorized', 403));
      }
    }
    throw Error('Empty token');
  } catch (e) {
    console.log(e);
    return next(new HttpError('Unauthorized', 403));
  }
};

export const ensureAdmin = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'ADMIN')
    return next(new HttpError('Unauthorized', 403));
  next();
};

export const ensureCustomer = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== 'CUSTOMER')
    return next(new HttpError('Unauthorized', 403));
  next();
};
