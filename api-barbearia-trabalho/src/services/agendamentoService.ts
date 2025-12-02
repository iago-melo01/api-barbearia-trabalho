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
  // Converter data para ISO-8601 se fornecida
  const updateData: any = { ...data };
  
  // Remover campos que não devem ser atualizados
  delete updateData.clienteId;
  delete updateData.barbeiroId;
  delete updateData.servicoId;
  
  // Processar campo data se existir
  if (updateData.data && typeof updateData.data === 'string') {
    const dataValue = updateData.data;
    // Verificar se já está em formato ISO-8601 completo
    const isISOFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(dataValue) || 
                        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?[+-]\d{2}:\d{2}$/.test(dataValue);
    
    if (!isISOFormat) {
      // Se não estiver em formato ISO, converter
      // Formato datetime-local: "2025-12-11T01:11" -> precisa converter para ISO
      const date = new Date(dataValue);
      if (!isNaN(date.getTime())) {
        updateData.data = date.toISOString();
      } else {
        // Se não conseguir converter, remover do updateData para não causar erro
        delete updateData.data;
      }
    }
  }
  
  return prisma.agendamento.update({
    where: { id },
    data: updateData});
};

export const remove = async (id: number): Promise<Agendamento> => {
  return prisma.agendamento.delete({ where: { id } });
};

export const getByClienteId = async (clienteId: number) => {
  return prisma.agendamento.findMany({
    where: { clienteId },
    include: {
      cliente: { select: { nome: true } },
      barbeiro: { select: { nome: true } },
      servico: { select: { nome: true, descricao: true } }
    },
    orderBy: { data: 'desc' },
  });
};