class FuncionController {
  constructor(service) {
    this.funcionService = service;
  }

  getAllFunciones = async (req, res, next) => {
    try {
      const funciones = await this.funcionService.getAllFunciones();
      res.status(200).send({ success: true, message: funciones });
    } catch (error) {
      next(error);
    }
  };

  getFuncionById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const funcion = await this.funcionService.getFuncionById(id);
      res.status(200).send({ success: true, message: funcion });
    } catch (error) {
      next(error);
    }
  };

  createFuncion = async (req, res, next) => {
    try {
      const { fecha, hora, sala, precio, cineId, peliculaId } = req.body;
      if (!fecha) throw new Error("fecha is required");
      if (!hora) throw new Error("hora is required");
      if (!cineId) throw new Error("cineId is required");
      if (!peliculaId) throw new Error("peliculaId is required");
      const funcion = await this.funcionService.createFuncion({ fecha, hora, sala, precio, cineId, peliculaId });
      res.status(201).send({ success: true, message: funcion });
    } catch (error) {
      next(error);
    }
  };

  updateFuncion = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { fecha, hora, sala, precio, cineId, peliculaId } = req.body;
      const funcion = await this.funcionService.updateFuncion(id, { fecha, hora, sala, precio, cineId, peliculaId });
      res.status(200).send({ success: true, message: funcion });
    } catch (error) {
      next(error);
    }
  };

  deleteFuncion = async (req, res, next) => {
    try {
      const { id } = req.params;
      const funcion = await this.funcionService.deleteFuncion(id);
      res.status(200).send({ success: true, message: funcion });
    } catch (error) {
      next(error);
    }
  };
}

export default FuncionController;