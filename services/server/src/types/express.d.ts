import { UserAuth } from 'types/models';

declare global {
  namespace Express {
    interface Request {
      user?: UserAuth;
    }
  }
}
