class CineService {
  constructor(cineModel) {
    this.cine = cineModel;
  }

  getAllCines = async () => {
    const cines = await this.cine.findAll();
    return cines;
  };

  getCineById = async (id) => {
    const cine = await this.cine.findOne({ where: { id } });
    return cine;
  };

  createCine = async ({ nombre, direccion }) => {
    const cine = await this.cine.create({ nombre, direccion });
    return cine;
  };

  updateCine = async (id, { nombre, direccion }) => {
    await this.cine.update({ nombre, direccion }, { where: { id } });
    return "Cine actualizado";
  };

  deleteCine = async (id) => {
    await this.cine.destroy({ where: { id } });
    return "Cine eliminado";
  };
}

export default CineService;