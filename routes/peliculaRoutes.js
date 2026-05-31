import { Router } from "express";
import peliculaController from "../containers/peliculaContainer.js";

const peliculaRoutes = Router();

peliculaRoutes.get("/", peliculaController.getAllPeliculas);
peliculaRoutes.get("/:id", peliculaController.getPeliculaById);
peliculaRoutes.post("/", peliculaController.createPelicula);
peliculaRoutes.put("/:id", peliculaController.updatePelicula);
peliculaRoutes.delete("/:id", peliculaController.deletePelicula);

export default peliculaRoutes;