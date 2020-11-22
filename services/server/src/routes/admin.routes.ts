import Route from './Route';
import CustomerController from 'controllers/admin/CustomerController';
import CategoryController from 'controllers/admin/CategoryController';
import ProductController from 'controllers/admin/ProductController';

const { routes, router } = Route;

routes.post('/customers', CustomerController.create);
routes.get('/customers/:email', CustomerController.show);

routes.post('/categories', CategoryController.create);
routes.get('/categories/:slug', CategoryController.show);

routes.post('/categories/:category/products', ProductController.create);
routes.get('/categories/:category/products/:slug', ProductController.show);

routes.get('/products/:slug', ProductController.show);

export default router;
