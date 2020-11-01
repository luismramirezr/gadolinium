import { NextFunction, Request, Response } from 'express';
import Youch from 'youch';

const HttpExceptionHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send();
  }
  const youch = new Youch(error, req);
  youch.toJSON().then((json) => res.status(500).json(json));
};

export default HttpExceptionHandler;
