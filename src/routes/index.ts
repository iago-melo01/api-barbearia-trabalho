import { Router } from 'express';
import avaliacaoRoutes from './avaliacaoRoutes';
import servicoRoutes from './servicoRoutes';
import clienteRoutes from './clienteRoutes';
import agendamentoRoutes from './agendamentoRoutes'

const routes = Router();

routes.use(avaliacaoRoutes);
routes.use(servicoRoutes);
routes.use(clienteRoutes);
routes.use(agendamentoRoutes);

export default routes;