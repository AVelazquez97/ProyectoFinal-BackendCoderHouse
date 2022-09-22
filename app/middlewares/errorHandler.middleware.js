const errorHandler = (error, req, res, next) => {
  const notFoundedErrors = [
    /* -------------------- Errores relacionados a productos -------------------- */
    'Error al insertar: uno o más campos quedaron vacíos.',
    'Error al listar: no se encontró el producto con el id indicado.',
    'Error al listar: no hay productos cargados en el sistema.',
    'Error al actualizar: uno o más campos quedaron vacíos.',
    'Error al actualizar: no se encontró el producto con el id indicado.',
    'Error al borrar: no se encontró el producto con el id indicado.',
    /* --------------------- Errores relacionados a carritos -------------------- */
    'Error al listar: no existe un carrito con el id indicado.',
    'Error al listar: el carrito seleccionado no tiene productos.',
    'Error al listar: el carrito no tiene un producto con el id indicado.',
    'Error al borrar: no existe un carrito con el id indicado.',
    'Error al borrar: no existe en el carrito un producto con el id indicado.',
    'Error al insertar: no existe un producto con el id indicado.',
    'Error al insertar: no existe un carrito con el id indicado.',
  ];
  if (notFoundedErrors.includes(error)) {
    res.status(404);
  } else {
    res.status(500);
  }
  console.log(error);
  res.json({ error });
};

export { errorHandler };
