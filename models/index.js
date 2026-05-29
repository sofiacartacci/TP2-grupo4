import sequelize from '../connection/sequelize.js';
import Cine from './Cine.js';
import Pelicula from './Pelicula.js';
import Funcion from './Funcion.js';

Cine.hasMany(Funcion, { foreignKey: 'cineId', onDelete: 'CASCADE' });
Funcion.belongsTo(Cine, { foreignKey: 'cineId' });

Pelicula.hasMany(Funcion, { foreignKey: 'peliculaId', onDelete: 'CASCADE' });
Funcion.belongsTo(Pelicula, { foreignKey: 'peliculaId' });

export { sequelize, Cine, Pelicula, Funcion };