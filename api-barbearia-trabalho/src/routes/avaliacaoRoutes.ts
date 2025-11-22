import { Router } from "express";
import {
  createAvaliacao,
  getAllAvaliacoes,
  getAvaliacaoById,
  updateAvaliacao,
  deleteAvaliacao,
} from "../controllers/avaliacaoController";

import { validateBody, validateParams } from "../middlewares/validation";
import {
  createAvaliacaoSchema,
  updateAvaliacaoSchema,
  idParamSchema,
} from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Avaliações
 *   description: Endpoints para gerenciar avaliações de serviços
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Avaliacao:
 *       type: object
 *       required:
 *         - cliente
 *         - barbeiro
 *         - nota
 *         - comentario
 *       properties:
 *         id:
 *           type: string
 *           example: "6721a6fe8d1f7d26b4c8f413"
 *         cliente:
 *           type: string
 *           example: "João da Silva"
 *         barbeiro:
 *           type: string
 *           example: "Carlos Souza"
 *         nota:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         comentario:
 *           type: string
 *           example: "Excelente atendimento! O corte ficou perfeito."
 *         data:
 *           type: string
 *           format: date-time
 *           example: "2025-10-07T14:30:00Z"
 */

/**
 * @swagger
 * /avaliacoes:
 *   post:
 *     summary: Cria uma nova avaliação
 *     tags: [Avaliações]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Avaliacao'
 *     responses:
 *       201:
 *         description: Avaliação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       400:
 *         description: Dados inválidos enviados
 */
router.post("/avaliacoes", validateBody(createAvaliacaoSchema), createAvaliacao);

/**
 * @swagger
 * /avaliacoes:
 *   get:
 *     summary: Retorna todas as avaliações
 *     tags: [Avaliações]
 *     responses:
 *       200:
 *         description: Lista de avaliações retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Avaliacao'
 */
router.get("/avaliacoes", getAllAvaliacoes);

/**
 * @swagger
 * /avaliacoes/{id}:
 *   get:
 *     summary: Retorna uma avaliação pelo ID
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       404:
 *         description: Avaliação não encontrada
 */
router.get("/avaliacoes/:id", validateParams(idParamSchema), getAvaliacaoById);

/**
 * @swagger
 * /avaliacoes/{id}:
 *   put:
 *     summary: Atualiza uma avaliação existente
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da avaliação
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Avaliacao'
 *     responses:
 *       200:
 *         description: Avaliação atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avaliacao'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Avaliação não encontrada
 */
router.put(
  "/avaliacoes/:id",
  validateParams(idParamSchema),
  validateBody(updateAvaliacaoSchema),
  updateAvaliacao
);

/**
 * @swagger
 * /avaliacoes/{id}:
 *   delete:
 *     summary: Remove uma avaliação pelo ID
 *     tags: [Avaliações]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da avaliação
 *     responses:
 *       200:
 *         description: Avaliação removida com sucesso
 *       404:
 *         description: Avaliação não encontrada
 */
router.delete("/avaliacoes/:id", validateParams(idParamSchema), deleteAvaliacao);

export default router;
