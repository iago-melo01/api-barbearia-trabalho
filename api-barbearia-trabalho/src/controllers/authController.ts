import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const login = async (req: Request, res: Response) => {
  try {
    const result = await authService.login(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({ message: error.message || 'Erro ao fazer login' });
  }
};

export const loginCliente = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginCliente(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({ message: error.message || 'Erro ao fazer login' });
  }
};

