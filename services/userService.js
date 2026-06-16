import { generateToken } from "../utils/jwt.js";

class UserService {
  constructor(user, rol) {  
    this.user = user;
    this.rol = rol;
  }

  getAllUsers = async () => {
    return await this.user.findAll({
      attributes: ["id", "nombre", "apellido", "email", "telefono", "rolId"],
      include: [{ model: this.rol, attributes: ["nombre"] }],
    });
  };

  getUserById = async (id) => {  
    return await this.user.findOne({
      where: { id },
      attributes: ["id", "nombre", "apellido", "email", "telefono", "rolId"],
      include: [{ model: this.rol, attributes: ["nombre"] }],
    });
  };

  createUser = async (data) => {
    return await this.user.create(data); 
  };

  deleteUser = async (id) => {
    return await this.user.destroy({ where: { id } }); 
  };

  login = async ({ email, password }) => {  
    const user = await this.user.findOne({
      where: { email },
      attributes: ["id", "nombre", "apellido", "email", "password", "rolId"],
    });
    if (!user) throw new Error("user not found");

    const isValid = await this.user.validatePassword(password, user.password); 
    if (!isValid) throw new Error("invalid password");

    const payload = { id: user.id, nombre: user.nombre, rolId: user.rolId };
    const token = generateToken(payload); 
    return { token, id: user.id };       
  };

  me = async (payload) => { 
    return payload;
  };
}

export default UserService;