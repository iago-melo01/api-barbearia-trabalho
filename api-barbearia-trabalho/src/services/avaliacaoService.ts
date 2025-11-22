import { prisma } from '../database/prisma';
import { Avaliacao } from '../generated/prisma';

type AvaliacaoCreateData = Omit<Avaliacao, 'id' | 'createdAt' | 'updatedAt'>; // é um tipo igual avaliacao, só que sem os atributos 'id', 'createdAt' e 'updatedAt'
type AvaliacaoUpdateData = Partial<Omit<Avaliacao, 'id' | 'createdAt' | 'updatedAt' | 'clienteId' | 'barbeiroId' | 'servicoId'>>;

export const create = async (data: AvaliacaoCreateData): Promise<Avaliacao> => {
  const { clienteId, barbeiroId, servicoId } = data;
  
  const cliente = await prisma.cliente.findUnique({ where: { id: clienteId } });
  if (!cliente) throw new Error('Cliente não encontrado');
  
  const barbeiro = await prisma.barbeiro.findUnique({ where: { id: barbeiroId }, include: {avaliacoes: true} });
  if (!barbeiro) throw new Error('Barbeiro não encontrado');

  const servico = await prisma.servico.findUnique({ where: { id: servicoId } });
  if (!servico) throw new Error('Servico não encontrado');

  let somaDasNotas = 0;
  let quantDeNotas = 0;
  barbeiro.avaliacoes.forEach(element => {
    somaDasNotas += element.nota;
    quantDeNotas += 1;
  });
  
  somaDasNotas += data.nota;
  quantDeNotas++;
  await prisma.barbeiro.update(
    {where: {id: barbeiroId}, data:{
      mediaNotas: (somaDasNotas / quantDeNotas),
    }}
  )
  return prisma.avaliacao.create({data});
};

export const getAll = async () => {
  return prisma.avaliacao.findMany({
    include: {
      cliente: { select: { nome: true } },
      barbeiro: { select: { nome: true } },
      servico: { select: { nome: true, descricao: true } }
    },
  });
};

export const getById = async (id: number) => {
  return prisma.avaliacao.findUnique({
    where: { id },
    include: { cliente: true, barbeiro: true, servico: true },
  });
};

export const update = async (id: number, data: AvaliacaoUpdateData): Promise<Avaliacao> => {
  return prisma.avaliacao.update({
    where: { id },
    data});
};

export const remove = async (id: number): Promise<Avaliacao> => {
  return prisma.avaliacao.delete({ where: { id } });
};