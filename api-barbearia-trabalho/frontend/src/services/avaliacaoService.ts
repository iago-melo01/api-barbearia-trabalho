import api from '../config/api';
import type { Avaliacao, CreateAvaliacaoData, UpdateAvaliacaoData } from '../types';

export const avaliacaoService = {
  getAll: async (): Promise<Avaliacao[]> => {
    const response = await api.get<Avaliacao[]>('/avaliacoes');
    return response.data;
  },

  getById: async (id: number): Promise<Avaliacao> => {
    const response = await api.get<Avaliacao>(`/avaliacoes/${id}`);
    return response.data;
  },

  create: async (data: CreateAvaliacaoData): Promise<Avaliacao> => {
    const response = await api.post<Avaliacao>('/avaliacoes', data);
    return response.data;
  },

  update: async (id: number, data: UpdateAvaliacaoData): Promise<Avaliacao> => {
    const response = await api.put<Avaliacao>(`/avaliacoes/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/avaliacoes/${id}`);
  },
};

