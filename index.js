import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { sequelize, Rol } from "./models/index.js";
import { SERVER_PORT } from "./config/config.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(router);
app.use(notFound);
app.use(errorHandler);

try {
  await sequelize.authenticate();
  console.log("Conexion a la base establecida.");
  await sequelize.sync({ alter: true });
  console.log("Tablas sincronizadas.");

  const cantidadRoles = await Rol.count();
  if (cantidadRoles === 0) {
    await Rol.bulkCreate([
      { nombre: "admin" },
      { nombre: "user" },
    ]);
    console.log("Roles base creados.");
  }

  app.listen(SERVER_PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${SERVER_PORT}`);
  });
} catch (error) {
  console.error("Error al iniciar el servidor:", error);
}