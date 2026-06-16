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
      const id = this.validarId(req.params.id);
      const cine = await this.cineService.getCineById(id);
      if (!cine)
        return res.status(404).send({ success: false, message: "Cine no encontrado" });
      res.status(200).send({ success: true, message: cine });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createCine = async (req, res) => {
    try {
      const { nombre, direccion } = req.body;
      this.validarDatosCine({ nombre, direccion });
      const cine = await this.cineService.createCine({
        nombre: nombre.trim(),
        direccion: direccion.trim(),
      });
      res.status(201).send({ success: true, message: cine });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updateCine = async (req, res) => {
    try {
      const id = this.validarId(req.params.id);
      const { nombre, direccion } = req.body;
      this.validarDatosCine({ nombre, direccion });

      const cineExistente = await this.cineService.getCineById(id);
      if (!cineExistente)
        return res.status(404).send({ success: false, message: "Cine no encontrado" });

      const cine = await this.cineService.updateCine(id, {
        nombre: nombre.trim(),
        direccion: direccion.trim(),
      });
      res.status(200).send({ success: true, message: cine });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  deleteCine = async (req, res) => {
    try {
      const id = this.validarId(req.params.id);
      const cineExistente = await this.cineService.getCineById(id);
      if (!cineExistente)
        return res.status(404).send({ success: false, message: "Cine no encontrado" });

      const cine = await this.cineService.deleteCine(id);
      res.status(200).send({ success: true, message: cine });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default CineController;