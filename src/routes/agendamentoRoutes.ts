import { Router } from "express";
import {
  createAgendamento,
  getAllAgendamentos,
  getAgendamentoById,
  updateAgendamento,
  deleteAgendamento,
} from "../controllers/agendamentoController";

import { validateBody, validateParams } from "../middlewares/validation";
import {
  createAgendamentoSchema,
  updateAgendamentoSchema,
  idParamSchema,
} from "../schemas/validation";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: Endpoints para gerenciar agendamentos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Agendamento:
 *       type: object
 *       required:
 *         - cliente
 *         - servico
 *         - data
 *         - hora
 *       properties:
 *         id:
 *           type: string
 *           example: "6720f52e0a18d3b6b5c2e7d3"
 *         cliente:
 *           type: string
 *           example: "João da Silva"
 *         servico:
 *           type: string
 *           example: "Corte de cabelo"
 *         data:
 *           type: string
 *           format: date
 *           example: "2025-10-07"
 *         hora:
 *           type: string
 *           example: "14:30"
 *         observacoes:
 *           type: string
 *           example: "Cliente prefere atendimento rápido"
 */

/**
 * @swagger
 * /agendamentos:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agendamento'
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       400:
 *         description: Dados inválidos enviados
 */
router.post("/agendamentos", validateBody(createAgendamentoSchema), createAgendamento);

/**
 * @swagger
 * /agendamentos:
 *   get:
 *     summary: Retorna todos os agendamentos
 *     tags: [Agendamentos]
 *     responses:
 *       200:
 *         description: Lista de agendamentos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agendamento'
 */
router.get("/agendamentos", getAllAgendamentos);

/**
 * @swagger
 * /agendamentos/{id}:
 *   get:
 *     summary: Retorna um agendamento pelo ID
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Agendamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       404:
 *         description: Agendamento não encontrado
 */
router.get("/agendamentos/:id", validateParams(idParamSchema), getAgendamentoById);

/**
 * @swagger
 * /agendamentos/{id}:
 *   put:
 *     summary: Atualiza um agendamento existente
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agendamento'
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamento'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Agendamento não encontrado
 */
router.put(
  "/agendamentos/:id",
  validateParams(idParamSchema),
  validateBody(updateAgendamentoSchema),
  updateAgendamento
);

/**
 * @swagger
 * /agendamentos/{id}:
 *   delete:
 *     summary: Remove um agendamento pelo ID
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Agendamento removido com sucesso
 *       404:
 *         description: Agendamento não encontrado
 */
router.delete("/agendamentos/:id", validateParams(idParamSchema), deleteAgendamento);

export default router;
