import CineController from "../controllers/cineController.js";
import CineService from "../services/cineService.js";
import { Cine } from "../models/index.js";

const cineService = new CineService(Cine);
const cineController = new CineController(cineService);

export default cineController;