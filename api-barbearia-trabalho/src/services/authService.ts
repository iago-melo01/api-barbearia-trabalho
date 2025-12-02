import { prisma } from '../database/prisma';
import bcrypt from 'bcrypt';

export interface LoginData {
  email: string;
  senha: string;
}

export interface AuthResult {
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
    createdAt: Date;
    updatedAt: Date;
  };
}

export const login = async (data: LoginData): Promise<AuthResult> => {
  const barbeiro = await prisma.barbeiro.findFirst({
    where: { email: data.email },
  });

  if (!barbeiro) {
    throw new Error('Email ou senha inválidos');
  }

  // Verifica se a senha no banco está hasheada (começa com $2a$, $2b$ ou $2y$)
  const senhaEstaHasheada = barbeiro.senha.startsWith('$2a$') || 
                             barbeiro.senha.startsWith('$2b$') || 
                             barbeiro.senha.startsWith('$2y$');

  let senhaValida = false;

  if (senhaEstaHasheada) {
    // Senha está hasheada, compara normalmente
    senhaValida = await bcrypt.compare(data.senha, barbeiro.senha);
  } else {
    // Senha está em texto plano (migração antiga), compara diretamente
    // E automaticamente atualiza para hash
    if (barbeiro.senha === data.senha) {
      senhaValida = true;
      // Atualiza a senha para hash
      const senhaHash = await bcrypt.hash(data.senha, 10);
      await prisma.barbeiro.update({
        where: { id: barbeiro.id },
        data: { senha: senhaHash },
      });
    }
  }

  if (!senhaValida) {
    throw new Error('Email ou senha inválidos');
  }

  // Retorna dados do barbeiro sem a senha
  const { senha: _, ...barbeiroSemSenha } = barbeiro;

  return {
    barbeiro: barbeiroSemSenha,
  };
};

export const loginCliente = async (data: LoginData): Promise<ClienteAuthResult> => {
  const cliente = await prisma.cliente.findUnique({
    where: { email: data.email },
  });

  if (!cliente) {
    throw new Error('Email ou senha inválidos');
  }

  const senhaValida = await bcrypt.compare(data.senha, cliente.senha);

  if (!senhaValida) {
    throw new Error('Email ou senha inválidos');
  }

  const { senha: _, ...clienteSemSenha } = cliente;

  return {
    cliente: clienteSemSenha,
  };
};

