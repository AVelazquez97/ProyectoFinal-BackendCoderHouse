import DAOFactory from '../DAOs/DAOFactory.js';
import { PERSISTENCY } from '../config/index.js';

let productDAO;
(async () => {
  try {
    productDAO = await DAOFactory.getPersistency('products', PERSISTENCY);
    return productDAO;
  } catch (error) {
    throw `${error}`;
  }
})();

const productsController = {
  getAllProducts: async (req, res, next) => {
    try {
      const allProducts = await productDAO.getAll();
      res.status(200).json(allProducts);
    } catch (error) {
      next(error);
    }
  },
  getProductById: async (req, res, next) => {
    let { id } = req.params;
    id = parseInt(id);
    try {
      const product = await productDAO.getById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
  addProduct: async (req, res, next) => {
    let { name, description, code, thumbnail, price, stock } = req.body;
    if (name && description && code && thumbnail && price && stock) {
      //si todos los campos están completos, se procede a ingresar el producto
      price = parseFloat(price);
      try {
        const msg = await productDAO.insertProduct({
          name,
          description,
          code,
          thumbnail,
          price,
          stock,
        });
        res.status(200).json(msg);
      } catch (error) {
        next(error);
      }
    } else {
      res
        .status(400)
        .json({ error: 'Algunos campos quedaron vacíos. Intenta nuevamente.' });
    }
  },
  updateProductById: async (req, res, next) => {
    let { id } = req.params;
    id = parseInt(id);
    let { name, description, code, thumbnail, price, stock } = req.body;
    if (name && description && code && thumbnail && price && stock) {
      //si los campos del form están completos, se procede a ingresar el producto
      price = parseFloat(price);
      try {
        const msg = await productDAO.updateProduct({
          id,
          timestamp: Date.now(),
          name,
          description,
          code,
          thumbnail,
          price,
          stock,
        });
        return res.status(200).json(msg);
      } catch (error) {
        next(error);
      }
    } else {
      res.status(400).json({
        error: 'Algunos campos quedaron vacíos. Intenta nuevamente.',
      });
    }
  },
  deleteProductById: async (req, res, next) => {
    let { id } = req.params;
    id = parseInt(id);
    try {
      const msg = await productDAO.deleteById(id);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
};
export default productsController;
