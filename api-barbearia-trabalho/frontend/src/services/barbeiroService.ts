import api from '../config/api';
import type { Barbeiro, CreateBarbeiroData, UpdateBarbeiroData } from '../types';

export const barbeiroService = {
  getAll: async (): Promise<Barbeiro[]> => {
    const response = await api.get<Barbeiro[]>('/barbeiros');
    return response.data;
  },

  getById: async (id: number): Promise<Barbeiro> => {
    const response = await api.get<Barbeiro>(`/barbeiros/${id}`);
    return response.data;
  },

  create: async (data: CreateBarbeiroData): Promise<Barbeiro> => {
    const response = await api.post<Barbeiro>('/barbeiros', data);
    return response.data;
  },

  update: async (id: number, data: UpdateBarbeiroData): Promise<Barbeiro> => {
    const response = await api.put<Barbeiro>(`/barbeiros/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/barbeiros/${id}`);
  },
};

