import HttpError from '~/utils/HttpError';
import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import getRsaKey from 'utils/getRsaKey';
import { UserAuth } from 'types/models';

export const authentication = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  if (!cookies?.authentication) next(new HttpError('Unauthorized', 403));
  const { authentication } = cookies;

  const rsa = await getRsaKey();

  try {
    const user = jwt.verify(authentication, rsa);
    if (user) {
      req.user = user as UserAuth;
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
