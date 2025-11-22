import { prisma } from '../database/prisma';
import { Agendamento } from '../generated/prisma';

type AgendamentoCreateData = Omit<Agendamento, 'id' | 'createdAt' | 'updatedAt'>;
type AgendamentoUpdateData = Partial<Omit<Agendamento, 'id' | 'createdAt' | 'updatedAt' | 'clienteId' | 'barbeiroId' | 'servicoId'>>;

export const create = async (data: AgendamentoCreateData): Promise<Agendamento> => {
  const { clienteId, barbeiroId, servicoId } = data;
  
  const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } });
  if (!cliente) throw new Error('Cliente não encontrado');
  
  const barbeiro = await prisma.barbeiro.findUnique({ where: { id: barbeiroId } });
  if (!barbeiro) throw new Error('Barbeiro não encontrado');

  const servico = await prisma.servico.findUnique({ where: { id: servicoId } });
  if (!servico) throw new Error('Servico não encontrado');


  return prisma.agendamento.create({data});
};

export const getAll = async () => {
  return prisma.agendamento.findMany({
    include: {
      cliente: { select: { nome: true } },
      barbeiro: { select: { nome: true } },
      servico: { select: { nome: true, descricao: true } }
    },
  });
};

export const getById = async (id: number) => {
  return prisma.agendamento.findUnique({
    where: { id },
    include: { cliente: true, barbeiro: true, servico: true },
  });
};

export const update = async (id: number, data: AgendamentoUpdateData): Promise<Agendamento> => {
  return prisma.agendamento.update({
    where: { id },
    data});
};

export const remove = async (id: number): Promise<Agendamento> => {
  return prisma.agendamento.delete({ where: { id } });
};