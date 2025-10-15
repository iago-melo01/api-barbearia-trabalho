import { Router } from "express";
import {
  createBarbeiro,
  getAllBarbeiros,
  getBarbeiroById,
  updateBarbeiro,
  deleteBarbeiro,
} from "../controllers/barbeiroController";
import { validateBody, validateParams } from "../middlewares/validation";
import {
  createBarbeiroSchema,
  updateBarbeiroSchema,
  idParamSchema,
} from "../schemas/validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Barbeiros
 *   description: Endpoints para gerenciar barbeiros do sistema
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Barbeiro:
 *       type: object
 *       required:
 *         - nome
 *         - especialidade
 *         - telefone
 *       properties:
 *         id:
 *           type: string
 *           example: "6721b9c18d3f9a26b4f1e9b0"
 *         nome:
 *           type: string
 *           example: "Carlos Souza"

 *         telefone:
 *           type: string
 *           example: "(83) 98888-1234"
 *         email:
 *           type: string
 *           example: "carlos@barbearia.com"

 */

/**
 * @swagger
 * /barbeiros:
 *   post:
 *     summary: Cadastra um novo barbeiro
 *     tags: [Barbeiros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Barbeiro'
 *     responses:
 *       201:
 *         description: Barbeiro criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barbeiro'
 *       400:
 *         description: Dados inválidos enviados
 */
router.post("/barbeiros", validateBody(createBarbeiroSchema), createBarbeiro);

/**
 * @swagger
 * /barbeiros:
 *   get:
 *     summary: Retorna todos os barbeiros cadastrados
 *     tags: [Barbeiros]
 *     responses:
 *       200:
 *         description: Lista de barbeiros retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Barbeiro'
 */
router.get("/barbeiros", getAllBarbeiros);

/**
 * @swagger
 * /barbeiros/{id}:
 *   get:
 *     summary: Retorna um barbeiro específico pelo ID
 *     tags: [Barbeiros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do barbeiro
 *     responses:
 *       200:
 *         description: Barbeiro encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barbeiro'
 *       404:
 *         description: Barbeiro não encontrado
 */
router.get("/barbeiros/:id", validateParams(idParamSchema), getBarbeiroById);

/**
 * @swagger
 * /barbeiros/{id}:
 *   put:
 *     summary: Atualiza os dados de um barbeiro
 *     tags: [Barbeiros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do barbeiro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Barbeiro'
 *     responses:
 *       200:
 *         description: Barbeiro atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Barbeiro'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Barbeiro não encontrado
 */
router.put(
  "/barbeiros/:id",
  validateParams(idParamSchema),
  validateBody(updateBarbeiroSchema),
  updateBarbeiro
);

/**
 * @swagger
 * /barbeiros/{id}:
 *   delete:
 *     summary: Remove um barbeiro do sistema
 *     tags: [Barbeiros]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do barbeiro
 *     responses:
 *       200:
 *         description: Barbeiro removido com sucesso
 *       404:
 *         description: Barbeiro não encontrado
 */
router.delete("/barbeiros/:id", validateParams(idParamSchema), deleteBarbeiro);

export default router;
