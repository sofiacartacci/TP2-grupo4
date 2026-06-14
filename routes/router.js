import { Router } from "express";
import cineRoutes from "./cineRoutes.js";
import peliculaRoutes from "./peliculaRoutes.js";
import funcionRoutes from "./funcionRoutes.js";
import userRoutes from "./userRoutes.js";  
const router = Router();

router.use("/cines", cineRoutes);
router.use("/peliculas", peliculaRoutes);
router.use("/funciones", funcionRoutes);
router.use("/users", userRoutes);            
export default router;