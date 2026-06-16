class FuncionService {
  constructor(funcionModel, cineModel, peliculaModel) {
    this.funcion = funcionModel;
    this.cine = cineModel;
    this.pelicula = peliculaModel;
  }

  verificarRelaciones = async (cineId, peliculaId) => {
    const cine = await this.cine.findOne({ where: { id: cineId } });
    if (!cine) {
      const error = new Error("El cine indicado no existe");
      error.status = 404;
      throw error;
    }

    const pelicula = await this.pelicula.findOne({ where: { id: peliculaId } });
    if (!pelicula) {
      const error = new Error("La película indicada no existe");
      error.status = 404;
      throw error;
    }
  };

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
    await this.verificarRelaciones(cineId, peliculaId);
    const funcion = await this.funcion.create({ fecha, hora, sala, precio, cineId, peliculaId });
    return funcion;
  };

  updateFuncion = async (id, { fecha, hora, sala, precio, cineId, peliculaId }) => {
    await this.verificarRelaciones(cineId, peliculaId);
    await this.funcion.update({ fecha, hora, sala, precio, cineId, peliculaId }, { where: { id } });
    return "Funcion actualizada";
  };

  deleteFuncion = async (id) => {
    await this.funcion.destroy({ where: { id } });
    return "Funcion eliminada";
  };
}

export default FuncionService;