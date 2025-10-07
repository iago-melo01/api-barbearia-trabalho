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


router.post("/barbeiros", validateBody(createBarbeiroSchema), createBarbeiro);

router.get("/barbeiros", getAllBarbeiros);


router.get("/barbeiro/:id", validateParams(idParamSchema), getBarbeiroById);


router.put(
  "/barbeiro/:id",
  validateParams(idParamSchema),
  validateBody(updateBarbeiroSchema),
  updateBarbeiro
);

router.delete("/barbeiros/:id", validateParams(idParamSchema), deleteBarbeiro);

export default router;