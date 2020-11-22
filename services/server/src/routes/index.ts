import { Router } from 'express';
import {
  authentication,
  ensureAdmin,
  ensureCustomer,
  ensureSelf,
} from 'middlewares/Authentication';

import publicRoutes from './public.routes';
import admin from './admin.routes';
import customer from './customer.routes';

const routes = Router();

routes.use(publicRoutes);
routes.use('/admin', authentication, ensureAdmin, admin);
routes.use(
  '/customer/:email',
  authentication,
  ensureCustomer,
  ensureSelf,
  customer
);

export default routes;
