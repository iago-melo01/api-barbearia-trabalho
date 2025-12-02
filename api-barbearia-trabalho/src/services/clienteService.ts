import { prisma } from '../database/prisma';
import { Cliente } from '../generated/prisma';
import bcrypt from 'bcrypt';

type ClienteCreateData = Omit<Cliente, 'id' | 'createdAt' | 'updatedAt'>;
type ClienteUpdateData = Partial<ClienteCreateData>;

export const create = async (data: ClienteCreateData): Promise<Cliente> => {
  // Hash da senha se fornecida
  const dataComSenhaHash = data.senha 
    ? { ...data, senha: await bcrypt.hash(data.senha, 10) }
    : data;
  
  return prisma.cliente.create({ data: dataComSenhaHash });
};

export const getAll = async (): Promise<Cliente[]> => {
  return prisma.cliente.findMany();
};

export const getById = async (id: number): Promise<Cliente | null> => {
  return prisma.cliente.findUnique({ where: { id } });
};

export const getByEmail = async (email: string): Promise<Cliente | null> => {
  return prisma.cliente.findUnique({ where: { email } });
};

export const update = async (id: number, data: ClienteUpdateData): Promise<Cliente> => {
  // Hash da senha se fornecida
  const dataComSenhaHash = data.senha 
    ? { ...data, senha: await bcrypt.hash(data.senha, 10) }
    : data;
  
  return prisma.cliente.update({ where: { id }, data: dataComSenhaHash });
};

export const remove = async (id: number): Promise<Cliente> => {
  return prisma.cliente.delete({ where: { id } });
};