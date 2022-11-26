import DAOFactory from '../../DAOs/DAOFactory.js';
import { PERSISTENCY } from '../../config/index.js';
import { LoggerError } from '../../config/log4.js';
import cartsController from './cart.controller.js';
// import { sendMailOrder } from '../../utils/sendMail.js';

let orderDAO;

(async () => {
  try {
    orderDAO = await DAOFactory.getPersistency('orders', PERSISTENCY);
    return orderDAO;
  } catch (error) {
    LoggerError.error(error);
    throw `${error}`;
  }
})();

const ordersController = {
  getAllOrders: async (req, res, next) => {
    try {
      let ordenes = await ordersController.list({ email: req.user.email });
      res.json(ordenes);
    } catch (error) {
      next(error);
    }
  },
  getOrderById: async (req, res, next) => {
    try {
      let orden = await ordersController.listId(req.params.id);
      res.json(orden);
    } catch (error) {
      next(error);
    }
  },
  createOrder: async (req, res, next) => {
    try {
      let cliente = {
        id: req.user.id,
        email: req.user.email,
        direccion: req.user.direccion,
      };
      // const clientCartItems = await cartsController.getAllProductsFromCartById
      const itemsClientCart = await shoppingCartController.list(req.user.id);
      if (itemsClientCart.length) {
        let data = await ordersController.save(cliente, itemsClientCart);
        if (data) {
          return res.json({ success: 'Orden generada con exito' });
        }
        throw new Error('Error al guardar orden');
      } else {
        res.json({
          error: 'Antes de generar un pedido debe agregar productos al carrito',
        });
      }
    } catch (error) {
      res.json({ error: 'La orden no pudo ser generada' });
    }
  },
  updateOrderById: async (req, res, next) => {
    try {
      res.json(await ordersController.update(req.params.id, req.body));
    } catch (error) {
      res.json({ error: 'La orden no pudo ser actualizada' });
    }
  },
  confirmOrder: async (req, res, next) => {
    try {
      let confirmedOrder = await ordersController.update(req.params.id, {
        estado: 'enviada',
      });
      sendMailOrder(confirmedOrder);
      res.json(confirmedOrder);
    } catch (error) {
      res.json({ error: 'La orden no pudo ser confirmada' });
    }
  },
};

export default ordersController;