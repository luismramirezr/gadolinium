import Route from './Route';
import SessionController from 'controllers/SessionController';
import CustomerController from 'controllers/CustomerController';

const { routes, router } = Route;

routes.post('/sessions', SessionController.create);

routes.post('/customers', CustomerController.create);

export default router;
