import sequelize from "../connection/sequelize.js";
import Cine from "./Cine.js";
import Pelicula from "./Pelicula.js";
import Funcion from "./Funcion.js";
import User from "./User.js";
import Rol from "./Rol.js";

Cine.hasMany(Funcion, { foreignKey: "cineId", onDelete: "CASCADE" });
Funcion.belongsTo(Cine, { foreignKey: "cineId" });

Pelicula.hasMany(Funcion, { foreignKey: "peliculaId", onDelete: "CASCADE" });
Funcion.belongsTo(Pelicula, { foreignKey: "peliculaId" });

Rol.hasMany(User, { foreignKey: "rolId" });
User.belongsTo(Rol, { foreignKey: "rolId" });

export { sequelize, Cine, Pelicula, Funcion, User, Rol };