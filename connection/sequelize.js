import { Sequelize } from 'sequelize';
import path from 'path';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(import.meta.dirname, '..', 'cineort.sqlite'),
  logging: false,
});

export default sequelize;