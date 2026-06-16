class CineController {
  constructor(service) {
    this.cineService = service;
  }

  validarDatosCine = ({ nombre, direccion }) => {
    if (nombre === undefined || nombre === null)
      throw new Error("El nombre es obligatorio");
    if (typeof nombre !== "string" || nombre.trim() === "")
      throw new Error("El nombre debe ser un texto no vacío");

    if (direccion === undefined || direccion === null)
      throw new Error("La dirección es obligatoria");
    if (typeof direccion !== "string" || direccion.trim() === "")
      throw new Error("La dirección debe ser un texto no vacío");
  };

  validarId = (id) => {
    const idNumero = Number(id);
    if (!Number.isInteger(idNumero) || idNumero <= 0)
      throw new Error("El id debe ser un número entero positivo");
    return idNumero;
  };

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
      const id = this.validarId(req.params.id);
      const cine = await this.cineService.getCineById(id);
      if (!cine) {
        const error = new Error("Cine no encontrado");
        error.status = 404;
        throw error;
      }
      res.status(200).send({ success: true, message: cine });
    } catch (error) {
      next(error);
    }
  };

  createCine = async (req, res, next) => {
    try {
      const { nombre, direccion } = req.body;
      this.validarDatosCine({ nombre, direccion });
      const cine = await this.cineService.createCine({
        nombre: nombre.trim(),
        direccion: direccion.trim(),
      });
      res.status(201).send({ success: true, message: cine });
    } catch (error) {
      next(error);
    }
  };

  updateCine = async (req, res, next) => {
    try {
      const id = this.validarId(req.params.id);
      const { nombre, direccion } = req.body;
      this.validarDatosCine({ nombre, direccion });

      const cineExistente = await this.cineService.getCineById(id);
      if (!cineExistente) {
        const error = new Error("Cine no encontrado");
        error.status = 404;
        throw error;
      }

      const cine = await this.cineService.updateCine(id, {
        nombre: nombre.trim(),
        direccion: direccion.trim(),
      });
      res.status(200).send({ success: true, message: cine });
    } catch (error) {
      next(error);
    }
  };

  deleteCine = async (req, res, next) => {
    try {
      const id = this.validarId(req.params.id);

      const cineExistente = await this.cineService.getCineById(id);
      if (!cineExistente) {
        const error = new Error("Cine no encontrado");
        error.status = 404;
        throw error;
      }

      const cine = await this.cineService.deleteCine(id);
      res.status(200).send({ success: true, message: cine });
    } catch (error) {
      next(error);
    }
  };
}

export default CineController;