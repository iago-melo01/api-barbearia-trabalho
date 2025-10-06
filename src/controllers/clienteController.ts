import { Request, Response } from 'express';
import * as clienteService from '../services/clienteService';

export const createcliente = async (req: Request, res: Response) => {
  try {
    const cliente = await clienteService.create(req.body);
    return res.status(201).json(cliente);
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
    return res.status(500).json({ message: error.message });
  }
};

export const getAllclientes = async (req: Request, res: Response) => {
  try {
    const clientes = await clienteService.getAll();
    return res.json(clientes);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getclienteById = async (req: Request, res: Response) => {
  try {
    const cliente = await clienteService.getById(Number(req.params.id));
    if (!cliente) return res.status(404).json({ message: 'cliente não encontrado(a).' });
    return res.json(cliente);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updatecliente = async (req: Request, res: Response) => {
  try {
    const cliente = await clienteService.update(Number(req.params.id), req.body);
    return res.json(cliente);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'cliente não encontrado(a).' });
    if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
    return res.status(500).json({ message: error.message });
  }
};

export const deletecliente = async (req: Request, res: Response) => {
  try {
    await clienteService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'cliente não encontrado(a).' });
    return res.status(500).json({ message: error.message });
  }
};