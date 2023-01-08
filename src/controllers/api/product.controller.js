import DAOFactory from '../../persistency/DAO/DAOFactory.js';
import { PERSISTENCY } from '../../config/index.js';
import { LoggerError } from '../../config/log4.js';

let productDAO;
(async () => {
  try {
    productDAO = await DAOFactory.getPersistency('products', PERSISTENCY);
    return productDAO;
  } catch (error) {
    LoggerError.error(error);
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
  searchProductByFilter: async (req, res, next) => {
    const filters = req.query;
    /*Con las siguientes líneas se busca parsear todo los valores de la query para evitar errores*/
    filters.name.length === 0 ? (filters.name = null) : '';
    filters.code.length === 0 ? (filters.code = null) : '';
    filters.category.length === 0 ? (filters.category = null) : '';
    filters.minPrice.length === 0
      ? (filters.minPrice = null)
      : (filters.minPrice = parseFloat(filters.minPrice));
    filters.maxPrice.length === 0
      ? (filters.maxPrice = null)
      : (filters.maxPrice = parseFloat(filters.maxPrice));
    filters.minStock.length === 0
      ? (filters.minStock = null)
      : (filters.minStock = parseFloat(filters.minStock));
    filters.maxStock.length === 0
      ? (filters.maxStock = null)
      : (filters.maxStock = parseFloat(filters.maxStock));

    try {
      const products = await productDAO.searchByFilter(filters);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },
  addProduct: async (req, res, next) => {
    const { name, category, description, code, thumbnail, price, stock } = req.body;
    try {
      const success = await productDAO.insertProduct({
        name,
        category,
        description,
        code,
        thumbnail,
        price: parseFloat(price),
        stock,
      });
      res.status(200).json(success);
    } catch (error) {
      next(error);
    }
  },
  updateProductById: async (req, res, next) => {
    const { id } = req.params;
    const { name, category, description, code, thumbnail, price, stock } = req.body;
    try {
      const timestamp = new Date();
      const success = await productDAO.updateProduct(
        { id },
        {
          timestamp,
          name,
          category,
          description,
          code,
          thumbnail,
          price: parseFloat(price),
          stock,
        }
      );
      res.status(200).json(success);
    } catch (error) {
      next(error);
    }
  },
  deleteProductById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const success = await productDAO.deleteById(id);
      res.status(200).json(success);
    } catch (error) {
      next(error);
    }
  },
};
export default productsController;
