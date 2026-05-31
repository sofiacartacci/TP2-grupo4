import { Router } from "express";
import cineController from "../containers/cineContainer.js";

const cineRoutes = Router();

cineRoutes.get("/", cineController.getAllCines);
cineRoutes.get("/:id", cineController.getCineById);
cineRoutes.post("/", cineController.createCine);
cineRoutes.put("/:id", cineController.updateCine);
cineRoutes.delete("/:id", cineController.deleteCine);

export default cineRoutes;