import { prisma } from '../database/prisma';
import { Servico } from '../generated/prisma';

type ServicoCreateData = Omit<Servico, 'id' | 'createdAt' | 'updatedAt'>;
type ServicoUpdateData = Partial<ServicoCreateData>;

export const create = async (data: ServicoCreateData): Promise<Servico> => {
  return prisma.servico.create({ data });
};

export const getAll = async (): Promise<Servico[]> => {
  return prisma.servico.findMany();
};

export const getById = async (id: number): Promise<Servico | null> => {
  return prisma.servico.findUnique({ where: { id } });
};

export const update = async (id: number, data: ServicoUpdateData): Promise<Servico> => {
  return prisma.servico.update({ where: { id }, data });
};

export const remove = async (id: number): Promise<Servico> => {
  return prisma.servico.delete({ where: { id } });
};
