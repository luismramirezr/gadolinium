import HttpError from '~/utils/HttpError';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import getRsaKey from 'utils/getRsaKey';
import { UserAuth } from 'types/models';
import Admin from '../collections/Admin';
import Customer from '../collections/Customer';
import { verifyToken } from '~/services/authenticator';

export const authentication = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const cookies = req.signedCookies;

  if (!cookies?.authentication) return next(new HttpError('Unauthorized', 403));
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
        const uncryptedToken = jwt.verify(token, rsa) as string;
        if (uncryptedToken && uncryptedToken === authentication) return next();
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

export const internalAuthentication = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.query.key) return next(new HttpError('Not Found', 404));
  const { key } = req.query;
  const auth = await verifyToken(key as string);
  if (!auth) return next(new HttpError('Not Found', 404));
  return next();
};

export const refreshSession = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization)
    return next(new HttpError('Unauthorized1', 403));
  const { authorization } = req.headers;
  const token = authorization.split(' ').pop();
  if (!token) return next(new HttpError('Unauthorized', 403));

  const rsa = await getRsaKey();

  try {
    const payload = jwt.verify(token, rsa) as UserAuth;
    if (payload) {
      const user =
        payload.role === 'ADMIN'
          ? await Admin.getAdmin(payload.email)
          : await Customer.getCustomer(payload.email);
      req.user = user;
      return next();
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

export const ensureSelf = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { email } = req.params;
  const { user } = req;
  if (!email || user?.email !== email)
    return next(new HttpError('Unauthorized', 403));
  next();
};
