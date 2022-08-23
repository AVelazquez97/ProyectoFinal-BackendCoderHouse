const welcome = (req, res, next) => {
  res
    .status(200)
    .json({
      welcome:
        'Bienvenido a la api restful de esta aplicación eCommerce Backend',
    });
};

export { welcome };
