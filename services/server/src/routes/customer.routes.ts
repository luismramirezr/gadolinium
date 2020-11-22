import Route from './Route';
import AddressController from 'controllers/AddressController';
import OrderController from 'controllers/OrderController';

const { routes, router } = Route;

routes.post('/customers/:email/addresses', AddressController.create);
routes.put('/customers/:email/addresses/:name', AddressController.update);
routes.delete('/customers/:email/addresses/:name', AddressController.destroy);

routes.post('/customers/:email/orders', OrderController.create);
routes.get('/customers/:email/orders', OrderController.showCustomerOrders);

routes.get('/orders/:orderId', OrderController.show);

export default router;
