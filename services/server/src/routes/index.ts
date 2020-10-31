import { Router } from 'express';

const routes = Router();

import publicRoutes from './public.routes';

routes.use(publicRoutes);

export default routes;
