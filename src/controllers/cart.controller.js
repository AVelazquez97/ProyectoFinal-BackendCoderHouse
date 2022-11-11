import DAOFactory from '../DAOs/DAOFactory.js';
import { PERSISTENCY } from '../config/index.js';
import { LoggerError } from '../config/log4.js';

let cartDAO;
(async () => {
  try {
    cartDAO = await DAOFactory.getPersistency('carts', PERSISTENCY);
    return cartDAO;
  } catch (error) {
    LoggerError.error(error);
    throw `${error}`;
  }
})();

const cartsController = {
  createCart: async (req, res, next) => {
    try {
      const msg = await cartDAO.createCart({});
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
  deleteCartById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const msg = await cartDAO.deleteById(id);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
  getAllProductsFromCartById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const productsFromCart = await cartDAO.getProductsFromCartById(id);
      res.status(200).json(productsFromCart);
    } catch (error) {
      next(error);
    }
  },
  addProductToCartById: async (req, res, next) => {
    const { id, id_prod } = req.params;
    const { quantity } = req.body;
    try {
      const msg = await cartDAO.insertProduct(id, id_prod, quantity);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
  deleteProductFromCartById: async (req, res, next) => {
    const { id, id_prod } = req.params;
    try {
      const msg = await cartDAO.deleteProduct(id, id_prod);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
};

export default cartsController;
