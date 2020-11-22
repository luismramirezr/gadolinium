import Route from './Route';
import SessionController from 'controllers/public/SessionController';
import CustomerController from 'controllers/public/CustomerController';
import CategoryController from 'controllers/public/CategoryController';
import ProductController from 'controllers/public/ProductController';

const { routes, router } = Route;

routes.post('/sessions', SessionController.create);
routes.post('/customers', CustomerController.create);

routes.get('/categories', CategoryController.index);
routes.get('/categories/:slug', CategoryController.show);

routes.get('/categories/:categoryId/products', ProductController.index);
routes.get('/categories/:categoryId/products/:slug', ProductController.show);

export default router;
