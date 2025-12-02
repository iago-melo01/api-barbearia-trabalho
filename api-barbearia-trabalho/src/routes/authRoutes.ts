import { Router } from 'express';
import { login, loginCliente } from '../controllers/authController';
import { validateBody } from '../middlewares/validation';
import { loginBarbeiroSchema, loginClienteSchema } from '../schemas/validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Endpoints para autenticação de barbeiros
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login de um barbeiro
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: "barbeiro@barbearia.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 barbeiro:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                     nome:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: Email ou senha inválidos
 */
router.post('/auth/login', validateBody(loginBarbeiroSchema), login);

/**
 * @swagger
 * /auth/cliente/login:
 *   post:
 *     summary: Realiza login de um cliente
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: "cliente@exemplo.com"
 *               senha:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Email ou senha inválidos
 */
router.post('/auth/cliente/login', validateBody(loginClienteSchema), loginCliente);

export default router;

