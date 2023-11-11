import { Router } from "express";
import {
  getIngredientes,
  getIngrediente,
  getIngredientesReceta,
  createIngrediente,
  deleteIngrediente,
  updateIngrediente,
} from "../controllers/ingredientes.controllers.js";

const router = Router();

router.get("/ingredientes", getIngredientes);

router.get("/ingredientes/:id", getIngrediente);

router.get("/ingredientes-receta/:receta_id", getIngredientesReceta);

router.post("/ingredientes", createIngrediente);

router.put("/ingredientes/:id", updateIngrediente);

router.delete("/ingredientes/:id", deleteIngrediente);

export default router;