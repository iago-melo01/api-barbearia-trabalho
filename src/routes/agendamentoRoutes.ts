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

router.post("/agendamentos", validateBody(createAgendamentoSchema), createAgendamento);

router.get("/agendamentos", getAllAgendamentos);

router.get("/agendamentos/:id", validateParams(idParamSchema), getAgendamentoById);

router.put(
  "/agendamentos/:id",
  validateParams(idParamSchema),
  validateBody(updateAgendamentoSchema),
  updateAgendamento
);

router.delete("/agendamentos/:id", validateParams(idParamSchema), deleteAgendamento);
  
export default router;
