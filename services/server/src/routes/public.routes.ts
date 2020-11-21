import Route from './Route';
import SessionController from 'controllers/SessionController';
import CustomerController from 'controllers/CustomerController';
import AddressController from 'controllers/AddressController';

const { routes, router } = Route;

routes.post('/sessions', SessionController.create);

routes.post('/customer', CustomerController.create);
routes.post('/customer/:email/addresses', AddressController.create);
routes.put('/customer/:email/addresses/:name', AddressController.update);
routes.delete('/customer/:email/addresses/:name', AddressController.destroy);

export default router;
