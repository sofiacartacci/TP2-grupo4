import {Router} from "express"
import userController from "../containers/userController.js"
// ver si falta algo aca de autenticar de midelwares

const userRoutes = Router()

userRoutes.get("/login",userController.login)
userRoutes.get("/me", userController.me)
userRoutes.get("/",userController.getAllUsers)
userRoutes.get("/:id",userController.getUserById)
userRoutes.post("/",userController.createUser)
userRoutes.put("/:id",userController.updateUser)
userRoutes.delete("/:id",userController.deleteUser)

export default userRoutes