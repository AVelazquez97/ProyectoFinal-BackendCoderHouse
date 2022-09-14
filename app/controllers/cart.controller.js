import { CartContainer } from '../containers/CartContainer.js';
import { ProductContainer } from '../containers/ProductContainer.js';

const productsApi = new ProductContainer('./app/dbFileSystem/products.json');
const cartApi = new CartContainer('./app/dbFileSystem/cart.json');

const cartsController = {
  createCart: async (req, res, next) => {
    try {
      const msg = await cartApi.buildCart({});
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
  deleteCartById: async (req, res, next) => {
    let { id } = req.params;
    id = parseInt(id);
    try {
      const msg = await cartApi.deleteById(id);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
  getAllProductsFromCartById: async (req, res, next) => {
    let { id } = req.params;
    id = parseInt(id);
    try {
      const productsFromCart = await cartApi.getProductsFromCartById(id);
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
      const product = await productsApi.getById(id_prod);
      try {
        const msg = await cartApi.saveProduct(id, product);
        res.status(200).json(msg);
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  },
  deleteProductFromCartById: async (req, res, next) => {
    let { id, id_prod } = req.params;
    id = parseInt(id);
    id_prod = parseInt(id_prod);

    try {
      const msg = await cartApi.deleteProduct(id, id_prod);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
};

export default cartsController;
