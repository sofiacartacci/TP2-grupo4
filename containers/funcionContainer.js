import FuncionController from "../controllers/funcionController.js";
import FuncionService from "../services/funcionService.js";
import { Funcion, Cine, Pelicula } from "../models/index.js";

const funcionService = new FuncionService(Funcion, Cine, Pelicula);
const funcionController = new FuncionController(funcionService);

export default funcionController;