import TransactionController from 'controllers/internal/TransactionController';

import Route from './Route';

const { routes, router } = Route;

routes.post('/transactions', TransactionController.create);

export default router;
