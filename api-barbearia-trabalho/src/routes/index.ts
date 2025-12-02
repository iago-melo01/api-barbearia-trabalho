import { Router } from 'express';
import avaliacaoRoutes from './avaliacaoRoutes';
import servicoRoutes from './servicoRoutes';
import clienteRoutes from './clienteRoutes';
import agendamentoRoutes from './agendamentoRoutes';
import barbeiroRoutes from './barbeiroRoutes';
import authRoutes from './authRoutes';
const routes = Router();

routes.use(authRoutes);
routes.use(avaliacaoRoutes);
routes.use(servicoRoutes);
routes.use(clienteRoutes);
routes.use(agendamentoRoutes);
routes.use(barbeiroRoutes);


export default routes;