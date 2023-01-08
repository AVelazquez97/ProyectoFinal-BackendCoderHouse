import { check } from 'express-validator';

const productChainValidation = [
  check('name')
    .exists()
    .notEmpty()
    .withMessage('El campo nombre es requerido')
    .isString()
    .withMessage('El campo nombre debe ser de tipo string'),
  check('category')
    .exists()
    .notEmpty()
    .withMessage('El campo categoría es requerido')
    .isString()
    .withMessage('El campo nombre debe ser de tipo string'),
  check('description')
    .exists()
    .notEmpty()
    .withMessage('El campo descripcion es requerido')
    .isString()
    .withMessage('El campo descripcion debe ser de tipo string'),
  check('code')
    .isString()
    .withMessage('El campo codigo debe ser de tipo string')
    .exists()
    .notEmpty()
    .withMessage('El campo codigo es requerido'),
  check('price')
    .exists()
    .notEmpty()
    .withMessage('El campo precio es requerido')
    .isFloat({ min: 1 })
    .withMessage('El campo precio debe ser un numero mayor que 0'),
  check('stock')
    .exists()
    .notEmpty()
    .withMessage('El campo stock es requerido')
    .isInt({ min: 0 })
    .withMessage('El campo stock debe ser de tipo entero mayor o igual a 0'),
];

export default productChainValidation;
