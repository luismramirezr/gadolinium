import { Router } from 'express';

import UserController from 'controllers/UserController';
import AddressController from 'controllers/AddressController';

const routes = Router();

routes.get('/', (_req, res) => res.json({ success: true }));

routes.post('/user', UserController.create);
routes.get('/user/:email', UserController.show);

routes.post('/address', AddressController.create);
routes.get('/address/:userId', AddressController.show);

export default routes;
