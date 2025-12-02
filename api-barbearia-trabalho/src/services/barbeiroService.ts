import { prisma } from '../database/prisma';
import { Barbeiro } from '../generated/prisma';
import bcrypt from 'bcrypt';

type BarbeiroCreateData = Omit<Barbeiro, 'id' | 'createdAt' | 'updatedAt' >;
type BarbeiroUpdateData = Partial<BarbeiroCreateData>;


export const create = async (data: BarbeiroCreateData): Promise<Barbeiro> => {
  // Hash da senha se fornecida
  const dataComSenhaHash = data.senha 
    ? { ...data, senha: await bcrypt.hash(data.senha, 10) }
    : data;
  
  return prisma.barbeiro.create({ data: dataComSenhaHash });  
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
  // Hash da senha se fornecida
  const dataComSenhaHash = data.senha 
    ? { ...data, senha: await bcrypt.hash(data.senha, 10) }
    : data;
  
  return prisma.barbeiro.update({ where: { id }, data: dataComSenhaHash });
};

export const remove = async (id: number): Promise<Barbeiro> => {
  return prisma.barbeiro.delete({ where: { id } });
};