import Route from './Route';

import UserController from 'controllers/UserController';

const { routes, router } = Route;

routes.get('/', (_req, res) => res.json({ success: true }));

routes.post('/user', UserController.create);
routes.get('/user/:email', UserController.show);

export default router;
