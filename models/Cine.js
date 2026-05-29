import { DataTypes } from 'sequelize';
import sequelize from '../connection/sequelize.js';

const Cine = sequelize.define('Cine', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  direccion: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'cines' });

export default Cine;