import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class Cine extends Model {}

Cine.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Cine",
    tableName: "cines",
  }
);

export default Cine;