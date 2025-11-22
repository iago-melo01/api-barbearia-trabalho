import { z } from "zod";

// Schema para Cliente
export const createClienteSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100),
  email: z.string().email("Email inválido").max(255),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  telefone: z.string().min(10).max(15).optional(),
});

export const updateClienteSchema = createClienteSchema.partial();

// Schema para Barbeiro
export const createBarbeiroSchema = z.object({
  nome: z.string().min(2).max(100),
  email: z.string().email().max(255),
  telefone: z.string().min(10).max(15).optional(),
});

export const updateBarbeiroSchema = createBarbeiroSchema.partial();

// Schema para Servico
export const createServicoSchema = z.object({
  nome: z.string().min(2).max(100),
  descricao: z.string().max(500),
  preco: z.number().positive("Preço deve ser positivo"),
});

export const updateServicoSchema = createServicoSchema.partial();

// Schema para Agendamento
export const createAgendamentoSchema = z.object({
  clienteId: z.number().int().positive(),
  barbeiroId: z.number().int().positive(),
  servicoId: z.number().int().positive(),
  data: z.string()
    .refine((date) => !isNaN(new Date(date).getTime()), "Data inválida")
    .refine((date) => new Date(date) > new Date(), "Data deve ser futura"),
});

export const updateAgendamentoSchema = createAgendamentoSchema.partial();

// Schema para Avaliação
export const createAvaliacaoSchema = z.object({
  clienteId: z.number().int().positive(),
  barbeiroId: z.number().int().positive(),
  servicoId: z.number().int().positive(),
  nota: z.number().int().min(1).max(5),
  comentario: z.string().max(500),
});

export const updateAvaliacaoSchema = createAvaliacaoSchema.partial();

// Schema para validação de ID
export const idParamSchema = z.object({
  id: z.string()
    .regex(/^\d+$/, "ID deve ser um número válido")
    .transform(Number)
    .refine((num) => num > 0, "ID deve ser positivo"),
});

export type CreateClienteData = z.infer<typeof createClienteSchema>;
export type UpdateClienteData = z.infer<typeof updateClienteSchema>;

export type CreateBarbeiroData = z.infer<typeof createBarbeiroSchema>;
export type UpdateBarbeiroData = z.infer<typeof updateBarbeiroSchema>;

export type CreateServicoData = z.infer<typeof createServicoSchema>;
export type UpdateServicoData = z.infer<typeof updateServicoSchema>;

export type CreateAgendamentoData = z.infer<typeof createAgendamentoSchema>;
export type UpdateAgendamentoData = z.infer<typeof updateAgendamentoSchema>;

export type CreateAvaliacaoData = z.infer<typeof createAvaliacaoSchema>;
export type UpdateAvaliacaoData = z.infer<typeof updateAvaliacaoSchema>;

export type IdParam = z.infer<typeof idParamSchema>;
