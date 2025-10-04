// src/index.ts
import express from 'express';
import { criarServicoController } from './controllers/servicoController';

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/servicos', criarServicoController);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});