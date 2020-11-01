// import { Router } from 'express';
import Route from './Route';

import UserController from 'controllers/UserController';
import AddressController from 'controllers/AddressController';
import CategoryController from 'controllers/CategoryController';

const { routes, router } = Route;

routes.get('/', (_req, res) => res.json({ success: true }));

routes.post('/user', UserController.create);
routes.get('/user/:email', UserController.show);

routes.post('/address', AddressController.create);
routes.get('/address/:userId', AddressController.show);

routes.post('/category', CategoryController.create);

export default router;
