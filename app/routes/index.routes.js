import express from 'express';
import { router as productRouter } from './product.routes.js';
import { router as cartRouter } from './cart.routes.js';

const router = express.Router();

//Obtiene todas las subrutas de los diferentes ficheros y las engloba en router.
router.use('/productos', productRouter);
router.use('/carrito', cartRouter);

export { router };
