import { Router } from "express";
import {
  getRecetas,
  getReceta,
  createReceta,
  deleteReceta,
  updateReceta,
} from "../controllers/recetas.controllers.js";

const router = Router();

router.get("/recetas", getRecetas);

router.get("/recetas/:id", getReceta);

router.post("/recetas", createReceta);

router.put("/recetas/:id", updateReceta);

router.delete("/recetas/:id", deleteReceta);

export default router;