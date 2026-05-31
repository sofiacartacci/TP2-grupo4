class PeliculaController {
  constructor(service) {
    this.peliculaService = service;
  }

  getAllPeliculas = async (req, res) => {
    try {
      const peliculas = await this.peliculaService.getAllPeliculas();
      res.status(200).send({ success: true, message: peliculas });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getPeliculaById = async (req, res) => {
    try {
      const { id } = req.params;
      const pelicula = await this.peliculaService.getPeliculaById(id);
      res.status(200).send({ success: true, message: pelicula });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createPelicula = async (req, res) => {
    try {
      const { titulo, duracion, genero, sinopsis } = req.body;
      if (!titulo) throw new Error("titulo is required");
      if (!duracion) throw new Error("duracion is required");
      const pelicula = await this.peliculaService.createPelicula({ titulo, duracion, genero, sinopsis });
      res.status(201).send({ success: true, message: pelicula });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updatePelicula = async (req, res) => {
    try {
      const { id } = req.params;
      const { titulo, duracion, genero, sinopsis } = req.body;
      const pelicula = await this.peliculaService.updatePelicula(id, { titulo, duracion, genero, sinopsis });
      res.status(200).send({ success: true, message: pelicula });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  deletePelicula = async (req, res) => {
    try {
      const { id } = req.params;
      const pelicula = await this.peliculaService.deletePelicula(id);
      res.status(200).send({ success: true, message: pelicula });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default PeliculaController;