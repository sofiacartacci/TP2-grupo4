import { Router } from "express";
import funcionController from "../containers/funcionContainer.js";
import autenticar from "../middlewares/autenticar.js";

const funcionRoutes = Router();

funcionRoutes.get("/", funcionController.getAllFunciones);
funcionRoutes.get("/:id", funcionController.getFuncionById);
funcionRoutes.post("/", funcionController.createFuncion);
funcionRoutes.put("/:id", autenticar, funcionController.updateFuncion);
funcionRoutes.delete("/:id", autenticar, funcionController.deleteFuncion);

export default funcionRoutes;
