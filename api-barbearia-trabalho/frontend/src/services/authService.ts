import api from '../config/api';

export interface LoginData {
  email: string;
  senha: string;
}

export interface BarbeiroAuthResult {
  barbeiro: {
    id: number;
    nome: string;
    email: string;
    telefone?: string | null;
    mediaNotas: number;
  };
}

export interface ClienteAuthResult {
  cliente: {
    id: number;
    nome: string;
    email: string;
    telefone?: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export const authService = {
  loginBarbeiro: async (data: LoginData): Promise<BarbeiroAuthResult> => {
    const response = await api.post<BarbeiroAuthResult>('/auth/login', data);
    return response.data;
  },
  loginCliente: async (data: LoginData): Promise<ClienteAuthResult> => {
    const response = await api.post<ClienteAuthResult>('/auth/cliente/login', data);
    return response.data;
  },
};

