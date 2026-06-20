import { Rol } from "../models/index.js";
import RolService from "../services/rolService.js";
import RolController from "../controllers/rolController.js";

const rolService = new RolService(Rol);
const rolController = new RolController(rolService);

export default rolController;