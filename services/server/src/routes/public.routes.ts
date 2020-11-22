import Route from './Route';
import SessionController from 'controllers/public/SessionController';
import CustomerController from 'controllers/public/CustomerController';

const { routes, router } = Route;

routes.post('/sessions', SessionController.create);

routes.post('/customers', CustomerController.create);

export default router;
