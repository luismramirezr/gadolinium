import { Admin, Customer, WithGSI, WithKeys } from 'types/models';

declare global {
  namespace Express {
    interface Request {
      user?: (Admin | Customer) & WithKeys & WithGSI;
    }
  }
}
