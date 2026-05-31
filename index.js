import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from "./routes/router.js";
import { notFound } from "./middlewares/notFound.js";
import { sequelize } from "./models/index.js";
import { SERVER_PORT } from "./config/config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(router);
app.use(notFound);

try {
  await sequelize.authenticate();
  console.log("Conexion a la base establecida.");
  await sequelize.sync({ alter: true });
  console.log("Tablas sincronizadas.");
  app.listen(SERVER_PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${SERVER_PORT}`);
  });
} catch (error) {
  console.error("Error al iniciar el servidor:", error);
}