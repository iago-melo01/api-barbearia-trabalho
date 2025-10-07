import { Request, Response } from 'express';
import * as barbeiroService from '../services/barbeiroService';

export const createBarbeiro = async (req: Request, res: Response) => {
  try {
    const barbeiro = await barbeiroService.create(req.body);
    return res.status(201).json(barbeiro);
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
    return res.status(500).json({ message: error.message });
  }
};

export const getAllBarbeiros = async (req: Request, res: Response) => {
  try {
    const barbeiros = await barbeiroService.getAll();
    return res.json(barbeiros);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getBarbeiroById = async (req: Request, res: Response) => {
  try {
    const barbeiro = await barbeiroService.getById(Number(req.params.id));
    if (!barbeiro) return res.status(404).json({ message: 'Barbeiro(a) não encontrado(a).' });
    return res.json(barbeiro);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBarbeiro = async (req: Request, res: Response) => {
  try {
    const barbeiro = await barbeiroService.update(Number(req.params.id), req.body);
    return res.json(barbeiro);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Barbeiro(a) não encontrado(a).' });
    if (error.code === 'P2002') return res.status(409).json({ message: `Campo único já existe: ${error.meta.target}` });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteBarbeiro = async (req: Request, res: Response) => {
  try {
    await barbeiroService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Médico(a) não encontrado(a).' });
    return res.status(500).json({ message: error.message });
  }
};