import { DataTypes } from 'sequelize';
import sequelize from '../connection/sequelize.js';

const Pelicula = sequelize.define('Pelicula', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  duracion: { type: DataTypes.INTEGER, allowNull: false },
  genero: { type: DataTypes.STRING },
  sinopsis: { type: DataTypes.TEXT },
}, { tableName: 'peliculas' });

export default Pelicula;