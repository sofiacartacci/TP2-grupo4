class CineController {
  constructor(service) {
    this.cineService = service;
  }

  getAllCines = async (req, res, next) => {
    try {
      const cines = await this.cineService.getAllCines();
      res.status(200).send({ success: true, message: cines });
    } catch (error) {
      next(error);
    }
  };

  getCineById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cine = await this.cineService.getCineById(id);
      res.status(200).send({ success: true, message: cine });
    } catch (error) {
      next(error);
    }
  };

  createCine = async (req, res, next) => {
    try {
      const { nombre, direccion } = req.body;
      if (!nombre) throw new Error("nombre is required");
      if (!direccion) throw new Error("direccion is required");
      const cine = await this.cineService.createCine({ nombre, direccion });
      res.status(201).send({ success: true, message: cine });
    } catch (error) {
      next(error);
    }
  };

  updateCine = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { nombre, direccion } = req.body;
      const cine = await this.cineService.updateCine(id, { nombre, direccion });
      res.status(200).send({ success: true, message: cine });
    } catch (error) {
      next(error);
    }
  };

  deleteCine = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cine = await this.cineService.deleteCine(id);
      res.status(200).send({ success: true, message: cine });
    } catch (error) {
      next(error);
    }
  };
}

export default CineController;