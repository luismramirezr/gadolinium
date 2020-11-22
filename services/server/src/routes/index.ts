import { Router } from 'express';
import { authentication, ensureAdmin } from 'middlewares/Authentication';

import publicRoutes from './public.routes';
import admin from './admin.routes';
import customer from './customer.routes';

const routes = Router();

routes.use(publicRoutes);
routes.use('/admin', authentication, ensureAdmin, admin);
routes.use('/customer', authentication, ensureAdmin, customer);

export default routes;
