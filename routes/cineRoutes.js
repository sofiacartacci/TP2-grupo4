import { Router } from "express";
import cineController from "../containers/cineContainer.js";
import autenticar from "../middlewares/autenticar.js";

const cineRoutes = Router();

cineRoutes.get("/", cineController.getAllCines);
cineRoutes.get("/:id", cineController.getCineById);
cineRoutes.post("/", cineController.createCine);
cineRoutes.put("/:id", autenticar, cineController.updateCine);
cineRoutes.delete("/:id", autenticar, cineController.deleteCine);

export default cineRoutes;
