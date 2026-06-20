import {Router} from "express"
import rolController from "../containers/rolContainer.js"

const rolesRoutes= Router();
rolesRoutes.post("/",rolController.createRol);
rolesRoutes.get("/",rolController.getAllRoles);
rolesRoutes.get("/:id",rolController.getRolById);
rolesRoutes.put("/:id",rolController.updateRol);
rolesRoutes.delete("/:id",rolController.deleteRol);

export default rolesRoutes