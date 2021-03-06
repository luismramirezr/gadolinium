import Route from './Route';
import SessionController from 'controllers/public/SessionController';
import CustomerController from 'controllers/public/CustomerController';
import CategoryController from 'controllers/public/CategoryController';
import ProductController from 'controllers/public/ProductController';
import FileController from 'controllers/public/FileController';

import { authentication, refreshSession } from 'middlewares/Authentication';

const { routes, router } = Route;

routes.post('/sessions', SessionController.create);
routes.get('/sessions', [authentication, SessionController.show]);
routes.put('/sessions', [refreshSession, SessionController.update]);
routes.post('/customers', CustomerController.create);

routes.get('/categories', CategoryController.index);
routes.get('/categories/:slug', CategoryController.show);

routes.get('/categories/:categoryId/products', ProductController.index);
routes.get('/categories/:categoryId/products/:slug', ProductController.show);

routes.get('/files/:fileId', FileController.show);

export default router;
