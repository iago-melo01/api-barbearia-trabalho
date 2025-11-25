import api from '../config/api';
import type { Servico, CreateServicoData, UpdateServicoData } from '../types';

export const servicoService = {
  getAll: async (): Promise<Servico[]> => {
    const response = await api.get<Servico[]>('/servicos');
    return response.data;
  },

  getById: async (id: number): Promise<Servico> => {
    const response = await api.get<Servico>(`/servicos/${id}`);
    return response.data;
  },

  create: async (data: CreateServicoData): Promise<Servico> => {
    const response = await api.post<Servico>('/servicos', data);
    return response.data;
  },

  update: async (id: number, data: UpdateServicoData): Promise<Servico> => {
    const response = await api.put<Servico>(`/servicos/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/servicos/${id}`);
  },
};

