import { User, Rol } from "../models/index.js";
import UserService from "../services/userService.js";
import UserController from "../controllers/userController.js";

const userService = new UserService(User, Rol); 
const userController = new UserController(userService);

export default userController;