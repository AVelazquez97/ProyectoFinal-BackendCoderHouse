const handleErrors = (error, req, res, next) => {
  console.log(error);
  // if (error.name === 'CastName') {
  //   const msg = 'El formato del id ingresado por parámetro no es válido.';
  //   // res.status(400).json({ msg });
  // }
  res.status(500).json({ error });
};

export { handleErrors };
