import { Router } from "express";
import {
  createcliente,
  getAllclientes,
  getclienteById,
  updatecliente,
  deletecliente,
} from "../controllers/clienteController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createClienteSchema,
  updateClienteSchema,
  idParamSchema,
} from "../schemas/validation";
const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gerenciamento de Clientes
 */

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria um novo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - especialidade
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               especialidade:
 *                 type: string
 *               crm:
 *                 type: string
 *     responses:
 *       201:
 *         description: cliente criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       500:
 *         description: Erro interno do servidor
 */
router.post("/clientes", validateBody(createClienteSchema), createcliente);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Retorna todos os médicos
 *     tags: [Medicos]
 *     responses:
 *       200:
 *         description: Lista de médicos
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/clientes", getAllclientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Retorna um cliente pelo ID
 *     tags: [clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: cliente encontrado
 *       404:
 *         description: cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/clientes/:id", validateParams(idParamSchema), getclienteById);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualiza um cliente
 *     tags: [clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               especialidade:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: cliente atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/clientes/:id",
  validateParams(idParamSchema),
  validateBody(updateClienteSchema),
  updatecliente
);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Deleta um cliente
 *     tags: [clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: cliente deletado com sucesso
 *       404:
 *         description: cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete("/clientes/:id", validateParams(idParamSchema), deletecliente);

export default router;