import { Router } from "express";
import funcionController from "../containers/funcionContainer.js";

const funcionRoutes = Router();

funcionRoutes.get("/", funcionController.getAllFunciones);
funcionRoutes.get("/:id", funcionController.getFuncionById);
funcionRoutes.post("/", funcionController.createFuncion);
funcionRoutes.put("/:id", funcionController.updateFuncion);
funcionRoutes.delete("/:id", funcionController.deleteFuncion);

export default funcionRoutes;