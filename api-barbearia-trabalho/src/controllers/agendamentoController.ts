import { Request, Response } from 'express';
import * as agendamentoService from '../services/agendamentoService';

export const createAgendamento = async (req: Request, res: Response) => {
  try {
    const agendamento = await agendamentoService.create(req.body);
    return res.status(201).json(agendamento);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const getAllAgendamentos = async (req: Request, res: Response) => {
  try {
    const agendamento = await agendamentoService.getAll();
    return res.json(agendamento);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAgendamentoById = async (req: Request, res: Response) => {
  try {
    const agendamento = await agendamentoService.getById(Number(req.params.id));
    if (!agendamento) return res.status(404).json({ message: 'Agendamento não encontrada.' });
    return res.json(agendamento);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateAgendamento = async (req: Request, res: Response) => {
  try {
    const agendamento = await agendamentoService.update(Number(req.params.id), req.body);
    return res.json(agendamento);
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Agendamento não encontrada.' });
    return res.status(500).json({ message: error.message });
  }
};

export const deleteAgendamento = async (req: Request, res: Response) => {
  try {
    await agendamentoService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === 'P2025') return res.status(404).json({ message: 'Agendamento não encontrada.' });
    return res.status(500).json({ message: error.message });
  }
};

export const getAgendamentosByClienteId = async (req: Request, res: Response) => {
  try {
    const clienteId = Number(req.params.clienteId);
    const agendamentos = await agendamentoService.getByClienteId(clienteId);
    return res.json(agendamentos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};