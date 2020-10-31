import { Router } from 'express';

const routes = Router();

routes.get('/', (_req, res) => res.json({ success: true }));

export default routes;
