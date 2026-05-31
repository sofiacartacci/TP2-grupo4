import PeliculaController from "../controllers/peliculaController.js";
import PeliculaService from "../services/peliculaService.js";
import { Pelicula } from "../models/index.js";

const peliculaService = new PeliculaService(Pelicula);
const peliculaController = new PeliculaController(peliculaService);

export default peliculaController;