import { Request, Response } from 'express';
import * as avaliacaoService from '../services/avaliacaoService';

export const createAvaliacao = async (req: Request, res: Response) => {
  try {
    const avaliacao = await avaliacaoService.create(req.body);
    return res.status(201).json(avaliacao);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllAvaliacoes = async (req: Request, res: Response) => {
  try {
    const avaliacoes = await avaliacaoService.getAll();
    return res.json(avaliacoes);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAvaliacaoById = async (req: Request, res: Response) => {
  try {
    const avaliacao = await avaliacaoService.getById(Number(req.params.id));
    if (!avaliacao) return res.status(404).json({ message: 'Avaliação não encontrada.' });
    return res.json(avaliacao);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateAvaliacao = async (req: Request, res: Response) => {
  try {
    const avaliacao = await avaliacaoService.update(Number(req.params.id), req.body);
    return res.json(avaliacao);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Avaliação não encontrada.' });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAvaliacao = async (req: Request, res: Response) => {
  try {
    await avaliacaoService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Avaliacão não encontrada.' });
    return res.status(500).json({ message: error.message });
  }
};