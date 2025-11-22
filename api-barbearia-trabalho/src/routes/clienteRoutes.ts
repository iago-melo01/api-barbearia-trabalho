import { Router } from "express";
import {
  createCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
  deleteCliente,
} from "../controllers/clienteController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createClienteSchema,
  updateClienteSchema,
  idParamSchema,
} from "../schemas/validation";
import cors from "cors";

const router = Router();


/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gerenciamento de clientes
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
 *             $ref: '#/components/schemas/ClienteInput'
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Dados inválidos
 *
 *   get:
 *     summary: Lista todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes cadastrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *
 * /clientes/{id}:
 *   get:
 *     summary: Obtém um cliente específico pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Cliente não encontrado
 *
 *   put:
 *     summary: Atualiza as informações de um cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClienteInput'
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Cliente não encontrado
 *
 *   delete:
 *     summary: Remove um cliente pelo ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente removido com sucesso
 *       404:
 *         description: Cliente não encontrado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cliente:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "c7b1d1c3-9a8b-4b6e-bf5d-23a7a8d7b5f2"
 *         nome:
 *           type: string
 *           example: "João Silva"
 *         email:
 *           type: string
 *           example: "joao@email.com"
 *         telefone:
 *           type: string
 *           example: "(83) 98888-7777"
 *         criadoEm:
 *           type: string
 *           format: date-time
 *           example: "2025-10-07T14:00:00Z"
 *
 *     ClienteInput:
 *       type: object
 *       properties:
 *         nome:
 *           type: string
 *           example: "João Silva"
 *         email:
 *           type: string
 *           example: "joao@email.com"
 *         telefone:
 *           type: string
 *           example: "(83) 98888-7777"
 *         senha:
 *           type: string
 *           format: password
 *           example: "minhaSenhaSegura123"
 *       required:
 *         - nome
 *         - email
 *         - senha
 */

router.post("/clientes", validateBody(createClienteSchema), createCliente);
router.get("/clientes", getAllClientes);
router.get("/clientes/:id", validateParams(idParamSchema), getClienteById);
router.put(
  "/clientes/:id",
  validateParams(idParamSchema),
  validateBody(updateClienteSchema),
  updateCliente
);
router.delete("/clientes/:id", validateParams(idParamSchema), deleteCliente);

export default router;
