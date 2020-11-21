import Route from './Route';

import UserController from 'controllers/UserController';
import AddressController from '~/app/controllers/AddressController';

const { routes, router } = Route;

routes.get('/', (_req, res) => res.json({ success: true }));

routes.post('/user', UserController.create);
routes.get('/user/:email', UserController.show);
routes.post('/user/:email/address', AddressController.create);

export default router;
