import { Router } from "express";
import {
  getInsumos,
  getInsumo,
  createInsumo,
  deleteInsumo,
  updateInsumo,
} from "../controllers/insumos.controllers.js";

const router = Router();

router.get("/insumos", getInsumos);

router.get("/insumos/:id", getInsumo);

router.post("/insumos", createInsumo);

router.put("/insumos/:id", updateInsumo);

router.delete("/insumos/:id", deleteInsumo);

export default router;