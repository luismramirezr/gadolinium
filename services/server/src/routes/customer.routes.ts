import Route from './Route';
import AddressController from 'controllers/customer/AddressController';
import OrderController from 'controllers/customer/OrderController';

const { routes, router } = Route;

routes.get('/addresses/:slug', AddressController.show);
routes.post('/addresses', AddressController.create);
routes.put('/addresses/:slug', AddressController.update);
routes.delete('/addresses/:slug', AddressController.destroy);

routes.post('/orders', OrderController.create);
routes.get('/orders', OrderController.index);

routes.get('/orders/:orderId', OrderController.show);

export default router;
