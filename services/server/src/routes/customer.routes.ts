import Route from './Route';
import AddressController from 'controllers/customer/AddressController';
import OrderController from 'controllers/customer/OrderController';

const { routes, router } = Route;

routes.post('/addresses', AddressController.create);
routes.put('/addresses/:name', AddressController.update);
routes.delete('/addresses/:name', AddressController.destroy);

routes.post('/orders', OrderController.create);
routes.get('/orders', OrderController.showCustomerOrders);

routes.get('/orders/:orderId', OrderController.show);

export default router;
