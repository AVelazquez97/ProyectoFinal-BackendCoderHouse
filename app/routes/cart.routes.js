import express from 'express';
import cartsController from '../controllers/cart.controller.js';
import { idValidator } from '../middlewares/idValidator.middleware.js';
import { secondIdValidator } from '../middlewares/secondIdValidator.middleware.js';

const router = express.Router();

/* ------------------------------ Carts router ------------------------------ */
router.post('/', cartsController.createCart);
router.delete('/:id', idValidator, cartsController.deleteCartById);
router.get('/:id/productos', idValidator, cartsController.getAllProductsFromCartById);
router.post('/:id/productos/:id_prod', idValidator, secondIdValidator, cartsController.addProductToCartById);
router.delete('/:id/productos/:id_prod', idValidator, secondIdValidator, cartsController.deleteProductFromCartById);

export { router };
