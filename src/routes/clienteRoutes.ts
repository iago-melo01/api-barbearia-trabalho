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
const router = Router();

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