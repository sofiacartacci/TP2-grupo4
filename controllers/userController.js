class userController {
  constructor(service) {
    this.userService = service;
  }

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).send({ success: true, message: users });
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      res.status(200).send({ success: true, message: user });
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const required = ["nombre", "apellido", "email", "password", "telefono", "fechaNacimiento"]; 
      for (const field of required) {
        if (!req.body[field]) throw new Error(`${field} is required`);
      }
      const user = await this.userService.createUser(req.body);
      res.status(201).send({ success: true, message: user });
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req, res, next) => {
    // TODO: pendiente de implementar
  };

  deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      if (!id) throw new Error("Id obligatorio");
      const deleted = await this.userService.deleteUser(id);
      if (deleted === 1) {
        res.status(200).send({ success: true, message: deleted });
      } else {
        throw new Error("No se borro el usuario");
      }
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.login({ email, password });
      res.cookie("payload", user.token); 
      res.status(200).send({ success: true, message: user.id });
    } catch (error) {
      next(error);
    }
  };

  me = async (req, res, next) => {
  try {
    res.status(200).send({ success: true, message: req.user }); 
  } catch (error) {
    next(error);
  }
};
}

export default userController;