import { Router } from 'express';
import productsController from '../../controllers/api/product.controller.js';
import isAdmin from '../../middlewares/auth/isAdmin.middleware.js';
import authenticationMiddleware from '../../middlewares/auth/auth.middleware.js';
import productReqValidation from '../../middlewares/productChainValidation.middleware.js';
import productValidator from '../../middlewares/productValidator.middleware.js';

const router = Router();

/* ----------------------------- Products router ---------------------------- */
router.get('/listado', productsController.getAllProducts);

router.get('/listado/:id', productsController.getProductById);

router.get('/busqueda', productsController.searchProductByFilter);

router.post(
  '/',
  isAdmin,
  authenticationMiddleware,
  productReqValidation,
  productValidator,
  productsController.addProduct
);

router.put(
  '/:id',
  isAdmin,
  authenticationMiddleware,
  productReqValidation,
  productValidator,
  productsController.updateProductById
);

router.delete(
  '/:id',
  isAdmin,
  authenticationMiddleware,
  productsController.deleteProductById
);

export default router;
