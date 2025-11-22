import { prisma } from '../database/prisma';
import { Barbeiro } from '../generated/prisma';

type BarbeiroCreateData = Omit<Barbeiro, 'id' | 'createdAt' | 'updatedAt' >;
type BarbeiroUpdateData = Partial<BarbeiroCreateData>;


export const create = async (data: BarbeiroCreateData): Promise<Barbeiro> => {
  return prisma.barbeiro.create({ data });  
};

export const getAll = async (): Promise<Barbeiro[]> => {
  return prisma.barbeiro.findMany({
    include: {
      avaliacoes: true,
      agendamentos: true,
    },
  });
};

export const getById = async (id: number): Promise<Barbeiro | null> => {
  return prisma.barbeiro.findUnique({ where: { id },
  include: {} });
};

export const update = async (id: number, data: BarbeiroUpdateData): Promise<Barbeiro> => {
  return prisma.barbeiro.update({ where: { id }, data });
};

export const remove = async (id: number): Promise<Barbeiro> => {
  return prisma.barbeiro.delete({ where: { id } });
};