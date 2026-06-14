class PeliculaController {
  constructor(service) {
    this.peliculaService = service;
  }

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
      const { id } = req.params;
      const pelicula = await this.peliculaService.getPeliculaById(id);
      res.status(200).send({ success: true, message: pelicula });
    } catch (error) {
      next(error);
    }
  };

  createPelicula = async (req, res, next) => {
    try {
      const { titulo, duracion, genero, sinopsis } = req.body;
      if (!titulo) throw new Error("titulo is required");
      if (!duracion) throw new Error("duracion is required");
      const pelicula = await this.peliculaService.createPelicula({ titulo, duracion, genero, sinopsis });
      res.status(201).send({ success: true, message: pelicula });
    } catch (error) {
      next(error);
    }
  };

  updatePelicula = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { titulo, duracion, genero, sinopsis } = req.body;
      const pelicula = await this.peliculaService.updatePelicula(id, { titulo, duracion, genero, sinopsis });
      res.status(200).send({ success: true, message: pelicula });
    } catch (error) {
      next(error);
    }
  };

  deletePelicula = async (req, res, next) => {
    try {
      const { id } = req.params;
      const pelicula = await this.peliculaService.deletePelicula(id);
      res.status(200).send({ success: true, message: pelicula });
    } catch (error) {
      next(error);
    }
  };
}

export default PeliculaController;