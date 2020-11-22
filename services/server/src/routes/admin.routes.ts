import CustomerController from 'controllers/admin/CustomerController';
import CategoryController from 'controllers/admin/CategoryController';
import ProductController from 'controllers/admin/ProductController';
import FileController from 'controllers/admin/FileController';

import uploadFileMiddleware from 'middlewares/UploadFile';

import Route from './Route';

const { routes, router } = Route;

routes.post('/files', [
  uploadFileMiddleware.array('files'),
  FileController.create,
]);

routes.get('/files/:fileId', FileController.show);

routes.post('/customers', CustomerController.create);
routes.get('/customers/:email', CustomerController.show);

routes.get('/categories', CategoryController.index);
routes.post('/categories', CategoryController.create);
routes.get('/categories/:slug', CategoryController.show);

routes.get('/categories/:category/products', ProductController.index);
routes.post('/categories/:category/products', ProductController.create);
routes.get('/categories/:category/products/:slug', ProductController.show);

routes.get('/products/:slug', ProductController.show);

export default router;
