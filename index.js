import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes/router.js';
import { notFound } from './middlewares/notFound.js';
import { sequelize } from './models/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/api', router); 
app.use(notFound);  

const PORT = process.env.PORT || 8000;

try {
  await sequelize.authenticate();
  console.log('Conexión a la base establecida.');
  await sequelize.sync({ force: false });
  console.log('Tablas sincronizadas.');
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('Error al iniciar el servidor:', error);
}