import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcrypt"; 

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
    if (!user) throw new Error("Usuario no encontrado");

    const isValid = await this.user.validatePassword(password, user.password); 
    if (!isValid) throw new Error("Contraseña invalida");

    const payload = { id: user.id, nombre: user.nombre, rolId: user.rolId };
    const token = generateToken(payload); 
    return { token, id: user.id };       
  };

  me = async (payload) => { 
    return payload;
  };

  updateUser = async (id,data)=>{

    const user = await this.user.findOne({where:{id}});
    if(!user) return 0;

    if(data.email && data.email !== user.email){
      throw new Error("No se puede cambiar el email registrado")
    }

    const mismosDatos = Object.keys(data).every(key=>{
      if(key=== "password") return false;
      return data[key] === user[key];
    });

    if (mismosDatos){
      throw new Error("Los datos envidados son iguales a los actuales")
    }
    

  const [updated] = await this.user.update(data,
    {where:{id},
  validate:true,
individualHooks:true});

  return updated;
  };
}

export default UserService;