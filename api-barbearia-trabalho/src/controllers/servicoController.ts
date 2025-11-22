import { Request, Response } from 'express';
import * as servicoService from '../services/servicoService';

export const createServico = async (req: Request, res: Response) => {
  try {
    const servico = await servicoService.create(req.body);
    return res.status(201).json(servico);
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
    return res.status(500).json({ message: error.message });
  }
};

export const getAllServicos = async (req: Request, res: Response) => {
  try {
    const servicos = await servicoService.getAll();
    return res.json(servicos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getServicoById = async (req: Request, res: Response) => {
  try {
    const servico = await servicoService.getById(Number(req.params.id));
    if (!servico) return res.status(404).json({ message: 'Serviço(a) não encontrado(a).' });
    return res.json(servico);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateServico = async (req: Request, res: Response) => {
  try {
    const servico = await servicoService.update(Number(req.params.id), req.body);
    return res.json(servico);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Serviço(a) não encontrado(a).' });
    if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteServico = async (req: Request, res: Response) => {
  try {
    await servicoService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Serviço(a) não encontrado(a).' });
    return res.status(500).json({ message: error.message });
  }
};