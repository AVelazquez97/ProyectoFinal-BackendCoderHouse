import { Router } from 'express';
import ordersController from '../../controllers/api/order.controller.js';

const router = Router();

/* ----------------------------- Orders router ---------------------------- */
router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOrderById);
router.post('/', ordersController.createOrder);
router.put('/:id', ordersController.updateOrderById);
router.put('/:id', ordersController.confirmOrder);

export default router;
