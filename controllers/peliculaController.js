class PeliculaController {
  constructor(service) {
    this.peliculaService = service;
  }

  validarDatosPelicula = ({ titulo, duracion, genero, sinopsis }) => {
    if (titulo === undefined || titulo === null)
      throw new Error("El título es obligatorio");
    if (typeof titulo !== "string" || titulo.trim() === "")
      throw new Error("El título debe ser un texto no vacío");

    if (duracion === undefined || duracion === null)
      throw new Error("La duración es obligatoria");
    const duracionNumero = Number(duracion);
    if (!Number.isInteger(duracionNumero) || duracionNumero <= 0)
      throw new Error("La duración debe ser un número entero positivo (en minutos)");

    if (genero !== undefined && genero !== null && typeof genero !== "string")
      throw new Error("El género debe ser un texto");
    if (sinopsis !== undefined && sinopsis !== null && typeof sinopsis !== "string")
      throw new Error("La sinopsis debe ser un texto");
  };

  validarId = (id) => {
    const idNumero = Number(id);
    if (!Number.isInteger(idNumero) || idNumero <= 0)
      throw new Error("El id debe ser un número entero positivo");
    return idNumero;
  };

  getAllPeliculas = async (req, res, next) => {
    try {
      const peliculas = await this.peliculaService.getAllPeliculas();
      res.status(200).send({ success: true, message: peliculas });
    } catch (error) {
      next(error);
    }
  };

  getPeliculaById = async (req, res, next) => {
    try {
      const id = this.validarId(req.params.id);
      const pelicula = await this.peliculaService.getPeliculaById(id);
      if (!pelicula) {
        const error = new Error("Película no encontrada");
        error.status = 404;
        throw error;
      }
      res.status(200).send({ success: true, message: pelicula });
    } catch (error) {
      next(error);
    }
  };

  createPelicula = async (req, res, next) => {
    try {
      const { titulo, duracion, genero, sinopsis } = req.body;
      this.validarDatosPelicula({ titulo, duracion, genero, sinopsis });
      const pelicula = await this.peliculaService.createPelicula({
        titulo: titulo.trim(), duracion: Number(duracion), genero, sinopsis,
      });
      res.status(201).send({ success: true, message: pelicula });
    } catch (error) {
      next(error);
    }
  };

  updatePelicula = async (req, res, next) => {
    try {
      const id = this.validarId(req.params.id);
      const { titulo, duracion, genero, sinopsis } = req.body;
      this.validarDatosPelicula({ titulo, duracion, genero, sinopsis });

      const peliculaExistente = await this.peliculaService.getPeliculaById(id);
      if (!peliculaExistente) {
        const error = new Error("Película no encontrada");
        error.status = 404;
        throw error;
      }

      if (
        peliculaExistente.titulo === titulo.trim() &&
        peliculaExistente.duracion === Number(duracion) &&
        (peliculaExistente.genero ?? null) === (genero ?? null) &&
        (peliculaExistente.sinopsis ?? null) === (sinopsis ?? null)
      ) {
        throw new Error(
          "Los datos nuevos son iguales a los actuales, no hay cambios para guardar"
        );
      }

      const pelicula = await this.peliculaService.updatePelicula(id, {
        titulo: titulo.trim(), duracion: Number(duracion), genero, sinopsis,
      });
      res.status(200).send({ success: true, message: pelicula });
    } catch (error) {
      next(error);
    }
  };

  deletePelicula = async (req, res, next) => {
    try {
      const id = this.validarId(req.params.id);

      const peliculaExistente = await this.peliculaService.getPeliculaById(id);
      if (!peliculaExistente) {
        const error = new Error("Película no encontrada");
        error.status = 404;
        throw error;
      }

      const pelicula = await this.peliculaService.deletePelicula(id);
      res.status(200).send({ success: true, message: pelicula });
    } catch (error) {
      next(error);
    }
  };
}

export default PeliculaController;