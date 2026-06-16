export const errorHandler = (err, req, res, next) => {
  console.error(err);
  const status = err.status || 400;
  res.status(status).send({ success: false, message: err.message });
};