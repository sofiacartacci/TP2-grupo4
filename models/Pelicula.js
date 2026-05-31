import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";

class Pelicula extends Model {}

Pelicula.init(
  {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
    },
    sinopsis: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize: sequelize,
    modelName: "Pelicula",
    tableName: "peliculas",
  }
);

export default Pelicula;