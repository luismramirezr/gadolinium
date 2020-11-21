import Route from './Route';
import SessionController from 'controllers/SessionController';

const { routes, router } = Route;

routes.post('/sessions', SessionController.create);

export default router;
