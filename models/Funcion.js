import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class Funcion extends Model {}

Funcion.init(
  {
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sala: {
      type: DataTypes.STRING,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    sequelize: sequelize,
    modelName: "Funcion",
    tableName: "funciones",
  }
);

export default Funcion;