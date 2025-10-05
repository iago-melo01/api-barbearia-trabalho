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
