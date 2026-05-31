class FuncionService {
  constructor(funcionModel, cineModel, peliculaModel) {
    this.funcion = funcionModel;
    this.cine = cineModel;
    this.pelicula = peliculaModel;
  }

  getAllFunciones = async () => {
    const funciones = await this.funcion.findAll({
      include: [
        { model: this.cine, attributes: ["id", "nombre"] },
        { model: this.pelicula, attributes: ["id", "titulo"] },
      ],
    });
    return funciones;
  };

  getFuncionById = async (id) => {
    const funcion = await this.funcion.findOne({
      where: { id },
      include: [
        { model: this.cine, attributes: ["id", "nombre"] },
        { model: this.pelicula, attributes: ["id", "titulo"] },
      ],
    });
    return funcion;
  };

  createFuncion = async ({ fecha, hora, sala, precio, cineId, peliculaId }) => {
    const funcion = await this.funcion.create({ fecha, hora, sala, precio, cineId, peliculaId });
    return funcion;
  };

  updateFuncion = async (id, { fecha, hora, sala, precio, cineId, peliculaId }) => {
    await this.funcion.update({ fecha, hora, sala, precio, cineId, peliculaId }, { where: { id } });
    return "Funcion actualizada";
  };

  deleteFuncion = async (id) => {
    await this.funcion.destroy({ where: { id } });
    return "Funcion eliminada";
  };
}

export default FuncionService;