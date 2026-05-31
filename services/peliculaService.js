class PeliculaService {
  constructor(peliculaModel) {
    this.pelicula = peliculaModel;
  }

  getAllPeliculas = async () => {
    const peliculas = await this.pelicula.findAll();
    return peliculas;
  };

  getPeliculaById = async (id) => {
    const pelicula = await this.pelicula.findOne({ where: { id } });
    return pelicula;
  };

  createPelicula = async ({ titulo, duracion, genero, sinopsis }) => {
    const pelicula = await this.pelicula.create({ titulo, duracion, genero, sinopsis });
    return pelicula;
  };

  updatePelicula = async (id, { titulo, duracion, genero, sinopsis }) => {
    await this.pelicula.update({ titulo, duracion, genero, sinopsis }, { where: { id } });
    return "Pelicula actualizada";
  };

  deletePelicula = async (id) => {
    await this.pelicula.destroy({ where: { id } });
    return "Pelicula eliminada";
  };
}

export default PeliculaService;