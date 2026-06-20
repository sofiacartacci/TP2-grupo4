import { sequelize, Cine, Pelicula, Funcion } from "../models/index.js";

const ejecutarSeeder = async () => {
  try {
    console.log("Iniciando seeder...");

    await sequelize.sync();

    await Funcion.destroy({ where: {} });
    await Pelicula.destroy({ where: {} });
    await Cine.destroy({ where: {} });

    console.log("Datos anteriores eliminados.");

    const cines = await Cine.bulkCreate([
      {
        nombre: "Cine ORT Belgrano",
        direccion: "Av. del Libertador 6796, CABA",
      },
      {
        nombre: "Cine ORT Almagro",
        direccion: "Yatay 240, CABA",
      },
      {
        nombre: "Cine Caballito",
        direccion: "Av. Rivadavia 5100, CABA",
      },
    ]);

    console.log("Cines creados.");

    const peliculas = await Pelicula.bulkCreate([
      {
        titulo: "Intensamente 2",
        duracion: 96,
        genero: "Animación",
        sinopsis:
          "Riley entra en la adolescencia y nuevas emociones aparecen para cambiar su mundo interior.",
      },
      {
        titulo: "Avatar",
        duracion: 162,
        genero: "Ciencia ficción",
        sinopsis:
          "Un ex-marine llega a Pandora y se ve envuelto en el conflicto entre humanos y na'vi.",
      },
      {
        titulo: "Toy Story",
        duracion: 81,
        genero: "Animación",
        sinopsis:
          "Los juguetes de Andy cobran vida cuando los humanos no están presentes.",
      },
      {
        titulo: "Jurassic Park",
        duracion: 127,
        genero: "Aventura",
        sinopsis:
          "Un parque con dinosaurios clonados se convierte en una experiencia fuera de control.",
      },
    ]);

    console.log("Películas creadas.");

    await Funcion.bulkCreate([
      {
        fecha: "2026-06-20",
        hora: "18:00",
        sala: "Sala 1",
        precio: 6500.0,
        cineId: cines[0].id,
        peliculaId: peliculas[0].id,
      },
      {
        fecha: "2026-06-20",
        hora: "20:30",
        sala: "Sala 2",
        precio: 7000.0,
        cineId: cines[0].id,
        peliculaId: peliculas[1].id,
      },
      {
        fecha: "2026-06-21",
        hora: "17:00",
        sala: "Sala 1",
        precio: 6000.0,
        cineId: cines[1].id,
        peliculaId: peliculas[2].id,
      },
      {
        fecha: "2026-06-21",
        hora: "22:00",
        sala: "Sala 3",
        precio: 7500.0,
        cineId: cines[1].id,
        peliculaId: peliculas[3].id,
      },
      {
        fecha: "2026-06-22",
        hora: "19:30",
        sala: "Sala 2",
        precio: 6800.0,
        cineId: cines[2].id,
        peliculaId: peliculas[0].id,
      },
      {
        fecha: "2026-06-22",
        hora: "21:45",
        sala: "Sala 4",
        precio: 7200.0,
        cineId: cines[2].id,
        peliculaId: peliculas[1].id,
      },
    ]);

    console.log("Funciones creadas.");
    console.log("Seeder ejecutado correctamente.");

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("Error ejecutando el seeder:", error);

    await sequelize.close();
    process.exit(1);
  }
};

ejecutarSeeder();
