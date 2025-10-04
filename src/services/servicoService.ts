// src/services/servicoService.ts
import { Servico } from '../types/servico';
import { v4 as uuidv4 } from 'uuid'; // Instale com: npm install uuid

const servicos: Servico[] = [];

export function criarServico(
  nome: string,
  descricao: string,
  preco: number
): Servico {
  const novoServico: Servico = {
    id: uuidv4(),
    nome,
    descricao,
    preco,
    dataCriacao: new Date(),
  };

  servicos.push(novoServico);
  return novoServico;
}