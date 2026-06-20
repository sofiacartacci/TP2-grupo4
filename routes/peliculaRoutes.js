import { Router } from "express";
import peliculaController from "../containers/peliculaContainer.js";
import autenticar from "../middlewares/autenticar.js";

const peliculaRoutes = Router();

peliculaRoutes.get("/", peliculaController.getAllPeliculas);
peliculaRoutes.get("/:id", peliculaController.getPeliculaById);
peliculaRoutes.post("/", peliculaController.createPelicula);
peliculaRoutes.put("/:id", autenticar, peliculaController.updatePelicula);
peliculaRoutes.delete("/:id", autenticar, peliculaController.deletePelicula);

export default peliculaRoutes;
