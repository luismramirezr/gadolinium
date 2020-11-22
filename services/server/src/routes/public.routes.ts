import Route from './Route';
import SessionController from 'controllers/SessionController';
import CustomerController from 'controllers/CustomerController';
import AddressController from 'controllers/AddressController';
import OrderController from 'controllers/OrderController';

const { routes, router } = Route;

routes.post('/sessions', SessionController.create);

routes.post('/customer', CustomerController.create);
routes.post('/customer/:email/addresses', AddressController.create);
routes.put('/customer/:email/addresses/:name', AddressController.update);
routes.delete('/customer/:email/addresses/:name', AddressController.destroy);

routes.post('/customer/:email/orders', OrderController.create);
routes.get('/customer/:email/orders', OrderController.showCustomerOrders);
routes.get('/customer/:email/orders/:orderId', OrderController.show);

export default router;
