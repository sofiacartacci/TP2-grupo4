export const errorHandler = (err, req, res, next) => {
  //console.error(err);
  const status = err.status || 400;
    if (err.name === "SequelizeValidationError") {
    const mensajeLimpio = err.errors.map(e => e.message).join(" | ");
    return res.status(status).send({ success: false, message: mensajeLimpio });
  }
  const mensaje = err.message?.replace("Validation error: ", "");
  res.status(status).send({ success: false, message: mensaje });



};