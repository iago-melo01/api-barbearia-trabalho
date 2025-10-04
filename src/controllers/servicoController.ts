// src/controllers/servicoController.ts
import { Request, Response } from 'express';
import { criarServico } from '../services/servicoService';

export function criarServicoController(req: Request, res: Response) {
  const { nome, descricao, preco } = req.body;

  if (!nome || !descricao || preco === undefined) {
    return res.status(400).json({ erro: 'Campos obrigatórios ausentes.' });
  }

  const novoServico = criarServico(nome, descricao, preco);
  return res.status(201).json(novoServico);
}