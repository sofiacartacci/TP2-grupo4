import { DataTypes } from 'sequelize';
import sequelize from '../connection/sequelize.js';

const Funcion = sequelize.define('Funcion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  hora: { type: DataTypes.STRING, allowNull: false },
  sala: { type: DataTypes.STRING },
  precio: { type: DataTypes.DECIMAL(10, 2) },
}, { tableName: 'funciones' });

export default Funcion;