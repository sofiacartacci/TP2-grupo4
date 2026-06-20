import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class Rol extends Model {}

Rol.init(
  {
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique:{ msg:"El nombre del rol ya existe"},
      validate: {
        notEmpty:{msg:"El nombre del rol no puede estar vacío"},
        len: {args: [3, 50],msg: "El nombre del rol debe tener entre 3 y 50 caracteres"},
        is: {args:/^[a-z]+$/i,msg:"El nombre del rol solo puede contener letras"}
      }
    },
  },
  {
    sequelize,
    modelName: "Rol",
  },
);

export default Rol;