import DAOFactory from '../DAOs/DAOFactory.js';
import { PERSISTENCY } from '../config/index.js';

let cartDAO;
(async () => {
  try {
    cartDAO = await DAOFactory.getPersistency('carts', PERSISTENCY);
    return cartDAO;
  } catch (error) {
    throw `${error}`;
  }
})();

const cartsController = {
  createCart: async (req, res, next) => {
    try {
      const msg = await cartDAO.buildCart({});
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
  deleteCartById: async (req, res, next) => {
    let { id } = req.params;
    id = parseInt(id);
    try {
      const msg = await cartDAO.deleteById(id);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
  getAllProductsFromCartById: async (req, res, next) => {
    let { id } = req.params;
    id = parseInt(id);
    try {
      const productsFromCart = await cartDAO.getProductsFromCartById(id);
      res.status(200).json(productsFromCart);
    } catch (error) {
      next(error);
    }
  },
  addProductToCartById: async (req, res, next) => {
    let { id, id_prod } = req.params;
    id = parseInt(id);
    id_prod = parseInt(id_prod);

    try {
      const msg = await cartDAO.saveProduct(id, id_prod);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
  deleteProductFromCartById: async (req, res, next) => {
    let { id, id_prod } = req.params;
    id = parseInt(id);
    id_prod = parseInt(id_prod);

    try {
      const msg = await cartDAO.deleteProduct(id, id_prod);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
};

export default cartsController;
