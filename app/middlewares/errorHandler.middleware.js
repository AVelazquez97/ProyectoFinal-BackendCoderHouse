const errorHandler = (error, req, res, next) => {
  console.error(error);
  if (error.name === 'CastError') res.status(400).json({ error: 'Invalid ID' });
  else
    res.status(500).json({ error: 'Something went wrong. Please, try again' });
};

export { errorHandler };