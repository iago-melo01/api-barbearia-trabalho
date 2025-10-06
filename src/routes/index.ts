import { Router } from 'express';
import avaliacaoRoutes from './avaliacaoRoutes';
import servicoRoutes from './servicoRoutes';

const routes = Router();

routes.use(avaliacaoRoutes);
routes.use(servicoRoutes);

export default routes;