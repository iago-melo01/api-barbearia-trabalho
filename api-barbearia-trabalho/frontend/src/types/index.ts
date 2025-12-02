export enum Status {
  AGENDADO = 'AGENDADO',
  CONCLUIDO = 'CONCLUIDO',
  CANCELADO = 'CANCELADO',
}

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Barbeiro {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  mediaNotas: number;
  createdAt: string;
  updatedAt: string;
}

export interface Servico {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Agendamento {
  id: number;
  clienteId: number;
  barbeiroId: number;
  servicoId: number;
  data: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  cliente?: Cliente;
  barbeiro?: Barbeiro;
  servico?: Servico;
}

export interface Avaliacao {
  id: number;
  clienteId: number;
  barbeiroId: number;
  servicoId: number;
  nota: number;
  comentario: string;
  createdAt: string;
  updatedAt: string;
  cliente?: Cliente;
  barbeiro?: Barbeiro;
  servico?: Servico;
}

export interface CreateClienteData {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
}

export interface UpdateClienteData {
  nome?: string;
  email?: string;
  senha?: string;
  telefone?: string;
}

export interface CreateBarbeiroData {
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
}

export interface UpdateBarbeiroData {
  nome?: string;
  email?: string;
  senha?: string;
  telefone?: string;
}

export interface CreateServicoData {
  nome: string;
  descricao: string;
  preco: number;
  imagemUrl?: string;
}

export interface UpdateServicoData {
  nome?: string;
  descricao?: string;
  preco?: number;
  imagemUrl?: string;
}

export interface CreateAgendamentoData {
  clienteId: number;
  barbeiroId: number;
  servicoId: number;
  data: string;
}

export interface UpdateAgendamentoData {
  clienteId?: number;
  barbeiroId?: number;
  servicoId?: number;
  data?: string;
  status?: Status;
}

export interface CreateAvaliacaoData {
  clienteId: number;
  barbeiroId: number;
  servicoId: number;
  nota: number;
  comentario: string;
}

export interface UpdateAvaliacaoData {
  clienteId?: number;
  barbeiroId?: number;
  servicoId?: number;
  nota?: number;
  comentario?: string;
}

