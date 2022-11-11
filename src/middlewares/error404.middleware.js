const badRequest = (req, res, next) => {
  res
    .status(404)
    .json({
      error: -2,
      descripcion: `ruta ${req.url} método ${req.method} no implementada`,
    });
};

export { badRequest };
