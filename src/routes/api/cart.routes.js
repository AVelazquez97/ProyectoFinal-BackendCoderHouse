import { Router } from 'express';
import cartsController from '../../controllers/api/cart.controller.js';

const router = Router();

/* ------------------------------ Carts router ------------------------------ */
router.post('/', cartsController.createCart);
router.delete('/:id', cartsController.deleteCartById);
router.get('/:id/productos', cartsController.getAllProductsFromCartById);
router.post('/:id/productos/:id_prod', cartsController.addProductToCartById);
router.delete('/:id/productos/:id_prod', cartsController.deleteProductFromCartById);

export default router;
