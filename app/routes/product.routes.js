import express from 'express';
import productsController from '../controllers/products.controller.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';
import { idValidator } from '../middlewares/idValidator.middleware.js';

const router = express.Router();

/* ----------------------------- Products router ---------------------------- */
router.get('/', productsController.getAllProducts);
router.get('/:id', idValidator, productsController.getProductById);
router.post('/', isAdmin, productsController.addProduct);
router.put('/:id', isAdmin, idValidator, productsController.updateProductById);
router.delete('/:id', isAdmin, idValidator, productsController.deleteProductById);

export { router };
