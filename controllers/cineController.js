class CineController {
  constructor(service) {
    this.cineService = service;
  }

  getAllCines = async (req, res) => {
    try {
      const cines = await this.cineService.getAllCines();
      res.status(200).send({ success: true, message: cines });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getCineById = async (req, res) => {
    try {
      const { id } = req.params;
      const cine = await this.cineService.getCineById(id);
      res.status(200).send({ success: true, message: cine });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createCine = async (req, res) => {
    try {
      const { nombre, direccion } = req.body;
      if (!nombre) throw new Error("nombre is required");
      if (!direccion) throw new Error("direccion is required");
      const cine = await this.cineService.createCine({ nombre, direccion });
      res.status(201).send({ success: true, message: cine });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updateCine = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, direccion } = req.body;
      const cine = await this.cineService.updateCine(id, { nombre, direccion });
      res.status(200).send({ success: true, message: cine });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  deleteCine = async (req, res) => {
    try {
      const { id } = req.params;
      const cine = await this.cineService.deleteCine(id);
      res.status(200).send({ success: true, message: cine });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default CineController;