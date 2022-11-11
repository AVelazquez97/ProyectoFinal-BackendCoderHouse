import express from 'express';
import productsController from '../controllers/products.controller.js';
import { isAdmin } from '../middlewares/isAdmin.middleware.js';

const router = express.Router();

/* ----------------------------- Products router ---------------------------- */
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', isAdmin, productsController.addProduct);
router.put('/:id', isAdmin, productsController.updateProductById);
router.delete('/:id', isAdmin, productsController.deleteProductById);

export { router };
