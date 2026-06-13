import userController from '../controllers/userController.js';
import userController from '../controllers/userController.js';
import {User ,Rol} from '../models/index.js';
import userService from '../services/userService.js';
import userService from '../services/userService.js';

const userService    = new userService(User,Rol)
const userController = new userController(userService)

export default userController