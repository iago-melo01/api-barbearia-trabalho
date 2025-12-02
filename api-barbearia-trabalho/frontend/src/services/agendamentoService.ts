import api from '../config/api';
import type { Agendamento, CreateAgendamentoData, UpdateAgendamentoData } from '../types';

export const agendamentoService = {
  getAll: async (): Promise<Agendamento[]> => {
    const response = await api.get<Agendamento[]>('/agendamentos');
    return response.data;
  },

  getById: async (id: number): Promise<Agendamento> => {
    const response = await api.get<Agendamento>(`/agendamentos/${id}`);
    return response.data;
  },

  create: async (data: CreateAgendamentoData): Promise<Agendamento> => {
    const response = await api.post<Agendamento>('/agendamentos', data);
    return response.data;
  },

  update: async (id: number, data: UpdateAgendamentoData): Promise<Agendamento> => {
    const response = await api.put<Agendamento>(`/agendamentos/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/agendamentos/${id}`);
  },

  getByClienteId: async (clienteId: number): Promise<Agendamento[]> => {
    const response = await api.get<Agendamento[]>(`/agendamentos/cliente/${clienteId}`);
    return response.data;
  },
};

