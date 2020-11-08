import { NextFunction, Request, Response } from 'express';
import Youch from 'youch';

const HttpExceptionHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const parsed = JSON.parse(error.message);
  if (process.env.NODE_ENV === 'production') {
    return res.status(parsed.statusCode || 500).send(parsed.message || '');
  }
  const youch = new Youch(error, req);
  youch
    .toJSON()
    .then((json) =>
      res
        .status(parsed.statusCode || 500)
        .json({ message: parsed.message, stack: json })
    );
};

export default HttpExceptionHandler;
