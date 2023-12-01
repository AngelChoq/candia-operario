import { Router } from "express";
import {
  getRecetasInsumos,
  getRecetaInsumo,
  createRecetaInsumo,
  deleteRecetaInsumo,
  updateRecetaInsumo,
} from "../controllers/recetas-insumos.controllers.js";

const router = Router();

router.get("/recetas-insumos", getRecetasInsumos);

router.get("/recetas-insumos/:id", getRecetaInsumo);

router.post("/recetas-insumos", createRecetaInsumo);

router.put("/recetas-insumos/:id", updateRecetaInsumo);

router.delete("/recetas-insumos/:id", deleteRecetaInsumo);

export default router;