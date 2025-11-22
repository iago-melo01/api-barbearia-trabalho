import { Router } from "express";
import {
  createServico,
  getAllServicos,
  getServicoById,
  updateServico,
  deleteServico,
} from "../controllers/servicoController";

import { validateBody, validateParams } from "../middlewares/validation";
import {
  createServicoSchema,
  updateServicoSchema,
  idParamSchema,
} from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Serviços
 *   description: Gerenciamento dos serviços oferecidos pela barbearia
 */

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Cria um novo serviço
 *     tags: [Serviços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServicoInput'
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servico'
 *       400:
 *         description: Dados inválidos
 *
 *   get:
 *     summary: Lista todos os serviços cadastrados
 *     tags: [Serviços]
 *     responses:
 *       200:
 *         description: Lista de serviços disponíveis
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Servico'
 *
 * /servicos/{id}:
 *   get:
 *     summary: Busca um serviço pelo ID
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servico'
 *       404:
 *         description: Serviço não encontrado
 *
 *   put:
 *     summary: Atualiza as informações de um serviço
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ServicoInput'
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Servico'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Serviço não encontrado
 *
 *   delete:
 *     summary: Remove um serviço pelo ID
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço removido com sucesso
 *       404:
 *         description: Serviço não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Servico:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "b9f9d1e3-2a3c-4d6f-a5c2-3c8f0a5d9e3f"
 *         nome:
 *           type: string
 *           example: "Corte Degradê"
 *         descricao:
 *           type: string
 *           example: "Corte de cabelo masculino estilo degradê"
 *         preco:
 *           type: number
 *           example: 35.00
 *         duracao:
 *           type: integer
 *           description: Duração em minutos
 *           example: 45
 *         criadoEm:
 *           type: string
 *           format: date-time
 *           example: "2025-10-07T15:00:00Z"
 *
 *     ServicoInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "Corte Degradê"
 *         descricao:
 *           type: string
 *           example: "Corte de cabelo masculino estilo degradê"
 *         preco:
 *           type: number
 *           example: 35.00
 *         duracao:
 *           type: integer
 *           example: 45
 *       required:
 *         - nome
 *         - preco
 */

router.post("/servicos", validateBody(createServicoSchema), createServico);
router.get("/servicos", getAllServicos);
router.get("/servicos/:id", validateParams(idParamSchema), getServicoById);
router.put(
  "/servicos/:id",
  validateParams(idParamSchema),
  validateBody(updateServicoSchema),
  updateServico
);
router.delete("/servicos/:id", validateParams(idParamSchema), deleteServico);

export default router;
