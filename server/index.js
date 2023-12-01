import express from "express";
import {PORT} from './config.js';
import cors from "cors";

import indexRoutes from "./routes/index.routes.js";
import insumoRoutes from "./routes/insumos.routes.js"
import ingredientesRoutes from "./routes/ingredientes.routes.js"
import recetaRoutes from "./routes/recetas.routes.js"
import productoRoutes from "./routes/productos.routes.js"
import recetasInsumosRoutes from "./routes/recetas-insumos.routes.js"

const app = express();

app.use(cors());
app.use(express.json());
app.use(insumoRoutes);
app.use(ingredientesRoutes);
app.use(recetaRoutes);
app.use(productoRoutes);
app.use(recetasInsumosRoutes);
app.use(indexRoutes);
app.listen(PORT);
console.log(`Server is listening on port ${PORT}`);