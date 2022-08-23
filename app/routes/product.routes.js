import express from 'express';
import productsController from '../controllers/products.controller.js';

const router = express.Router();

/* ----------------------------- Products router ---------------------------- */
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.addProduct);
router.put('/:id', productsController.updateProductById);
router.delete('/:id', productsController.deleteProductById);

export { router };
