class FuncionController {
  constructor(service) {
    this.funcionService = service;
  }

  validarDatosFuncion = ({ fecha, hora, sala, precio, cineId, peliculaId }) => {
    if (fecha === undefined || fecha === null || fecha === "")
      throw new Error("La fecha es obligatoria");
    if (isNaN(Date.parse(fecha)))
      throw new Error("La fecha no tiene un formato válido (ej: 2025-12-31)");

    if (hora === undefined || hora === null)
      throw new Error("La hora es obligatoria");
    if (typeof hora !== "string" || hora.trim() === "")
      throw new Error("La hora debe ser un texto no vacío (ej: 20:30)");

    if (sala !== undefined && sala !== null && typeof sala !== "string")
      throw new Error("La sala debe ser un texto");

    if (precio !== undefined && precio !== null) {
      const precioNumero = Number(precio);
      if (isNaN(precioNumero) || precioNumero < 0)
        throw new Error("El precio debe ser un número mayor o igual a 0");
    }

    const cineIdNumero = Number(cineId);
    if (!Number.isInteger(cineIdNumero) || cineIdNumero <= 0)
      throw new Error("El cineId es obligatorio y debe ser un número entero positivo");

    const peliculaIdNumero = Number(peliculaId);
    if (!Number.isInteger(peliculaIdNumero) || peliculaIdNumero <= 0)
      throw new Error("El peliculaId es obligatorio y debe ser un número entero positivo");
  };

  validarId = (id) => {
    const idNumero = Number(id);
    if (!Number.isInteger(idNumero) || idNumero <= 0)
      throw new Error("El id debe ser un número entero positivo");
    return idNumero;
  };

  getAllFunciones = async (req, res) => {
    try {
      const funciones = await this.funcionService.getAllFunciones();
      res.status(200).send({ success: true, message: funciones });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  getFuncionById = async (req, res) => {
    try {
      const id = this.validarId(req.params.id);
      const funcion = await this.funcionService.getFuncionById(id);
      if (!funcion)
        return res.status(404).send({ success: false, message: "Función no encontrada" });
      res.status(200).send({ success: true, message: funcion });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  createFuncion = async (req, res) => {
    try {
      const { fecha, hora, sala, precio, cineId, peliculaId } = req.body;
      this.validarDatosFuncion({ fecha, hora, sala, precio, cineId, peliculaId });
      const funcion = await this.funcionService.createFuncion({
        fecha,
        hora: hora.trim(),
        sala,
        precio,
        cineId: Number(cineId),
        peliculaId: Number(peliculaId),
      });
      res.status(201).send({ success: true, message: funcion });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  updateFuncion = async (req, res) => {
    try {
      const id = this.validarId(req.params.id);
      const { fecha, hora, sala, precio, cineId, peliculaId } = req.body;
      this.validarDatosFuncion({ fecha, hora, sala, precio, cineId, peliculaId });

      const funcionExistente = await this.funcionService.getFuncionById(id);
      if (!funcionExistente)
        return res.status(404).send({ success: false, message: "Función no encontrada" });

      const funcion = await this.funcionService.updateFuncion(id, {
        fecha,
        hora: hora.trim(),
        sala,
        precio,
        cineId: Number(cineId),
        peliculaId: Number(peliculaId),
      });
      res.status(200).send({ success: true, message: funcion });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  deleteFuncion = async (req, res) => {
    try {
      const id = this.validarId(req.params.id);
      const funcionExistente = await this.funcionService.getFuncionById(id);
      if (!funcionExistente)
        return res.status(404).send({ success: false, message: "Función no encontrada" });

      const funcion = await this.funcionService.deleteFuncion(id);
      res.status(200).send({ success: true, message: funcion });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default FuncionController;