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

router.post("/avaliacoes", validateBody(createAvaliacaoSchema), createAvaliacao);

router.get("/avaliacoes", getAllAvaliacoes);

router.get("/avaliacoes/:id", validateParams(idParamSchema), getAvaliacaoById);

router.put(
  "/servicos/:id",
  validateParams(idParamSchema),
  validateBody(updateAvaliacaoSchema),
  updateAvaliacao
);

router.delete("/servicos/:id", validateParams(idParamSchema), deleteAvaliacao);
  
export default router;
