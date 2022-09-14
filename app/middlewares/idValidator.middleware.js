const idValidator = (req, res, next) => {
  const { id } = req.params;
  if (!isNaN(parseInt(id))) {
    // Si la conversión del id a int es posible, se continúa al controlador de la ruta
    next();
  } else {
    const msgError = 'El parámetro no es un número.';
    console.log(msgError);
    res.status(400).json({ error: msgError });
  }
};

export { idValidator };
