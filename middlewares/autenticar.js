import { verifyToken } from "../utils/jwt.js";

const autenticar = (req, res, next) => {
  try {
    const { payload } = req.cookies;
    if (!payload) throw new Error("token no encontrado");
    const user = verifyToken(payload);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ success: false, message: "No autorizado" });
  }
};

export default autenticar;