import Route from './Route';
import AddressController from 'controllers/customer/AddressController';
import OrderController from 'controllers/customer/OrderController';
import FileController from 'controllers/customer/FileController';
import CustomerController from 'controllers/customer/CustomerController';

import uploadFileMiddleware from 'middlewares/UploadFile';

const { routes, router } = Route;

routes.post('/files', [
  uploadFileMiddleware.array('files'),
  FileController.create,
]);

routes.get('/addresses/:slug', AddressController.show);
routes.post('/addresses', AddressController.create);
routes.put('/addresses/:slug', AddressController.update);
routes.delete('/addresses/:slug', AddressController.destroy);

routes.post('/orders', OrderController.create);
routes.get('/orders', OrderController.index);

routes.get('/orders/:orderId', OrderController.show);

routes.get('/profile', CustomerController.show);
routes.put('/profile', CustomerController.update);

export default router;
