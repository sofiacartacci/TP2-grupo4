import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class Rol extends Model {}

Rol.init(
  {
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: { is: /^[a-z]+$/i },
    },
  },
  {
    sequelize,
    modelName: "Rol",
  },
);

export default Rol;