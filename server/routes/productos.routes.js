import { Router } from "express";
import {
  getProductos,
  getProducto,
  createProducto,
  deleteProducto,
  updateProducto,
} from "../controllers/productos.controllers.js";

const router = Router();

router.get("/productos", getProductos);

router.get("/productos/:id", getProducto);

router.post("/productos", createProducto);

router.put("/productos/:id", updateProducto);

router.delete("/productos/:id", deleteProducto);

export default router;