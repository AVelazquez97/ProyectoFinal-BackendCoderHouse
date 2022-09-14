const isAdmin = (req, res, next) => {
  if (req.body.isAdmin) {
    next();
  } else {
    res.status(403).json({
      error: -1,
      descripcion: `ruta ${req.url} método ${req.method} no autorizada`,
    });
  }
};

export { isAdmin };
