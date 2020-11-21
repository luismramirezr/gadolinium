import Route from './Route';
import CustomerController from 'controllers/CustomerController';

const { routes, router } = Route;

routes.post('/user', CustomerController.create);
routes.get('/user/:email', CustomerController.show);

export default router;
