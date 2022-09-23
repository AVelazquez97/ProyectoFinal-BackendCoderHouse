import DAOFactory from '../DAOs/DAOFactory.js';
import { PERSISTENCY } from '../config/index.js';
import areFieldsFilled from '../utils/areFieldsFilled.js';


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
    const { id } = req.params;
    try {
      const product = await productDAO.getById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
  addProduct: async (req, res, next) => {
    if (areFieldsFilled(req.body)) {
      const { name, description, code, thumbnail, price, stock } = req.body;
      // Si no quedó ningún campo vacío, se procede a ingresar el producto
      try {
        const msg = await productDAO.insertProduct({
          name,
          description,
          code,
          thumbnail,
          price: parseFloat(price),
          stock,
        });
        res.status(200).json(msg);
      } catch (error) {
        next(error);
      }
    } else {
      next('Error al insertar: uno o más campos quedaron vacíos.');
    }
  },
  updateProductById: async (req, res, next) => {
    if (areFieldsFilled(req.body)) {
    const { id } = req.params;
    const { name, description, code, thumbnail, price, stock } = req.body;
      // Si no quedó ningún campo vacío, se procede a actualizar el producto
      try {
        const timestamp = new Date();
        const msg = await productDAO.updateProduct(
          { id },
          {
            timestamp,
            name,
            description,
            code,
            thumbnail,
            price: parseFloat(price),
            stock,
          }
        );
        res.status(200).json(msg);
      } catch (error) {
        next(error);
      }
    } else {
      next('Error al actualizar: uno o más campos quedaron vacíos.');
    }
  },
  deleteProductById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const msg = await productDAO.deleteById(id);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
};
export default productsController;
