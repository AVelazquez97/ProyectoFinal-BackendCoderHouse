import { CartContainer } from '../api/cartContainer.js';
import { ProductContainer } from '../api/productContainer.js';

const productsApi = new ProductContainer('./app/database/products.json');
const cartApi = new CartContainer('./app/database/cart.json');

const cartsController = {
  createCart: async (req, res) => {
    //Crea un carrito y devuelve su id.
    try {
      const msg = await cartApi.buildCart({});
      res.status(200).json(msg);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteCartById: async (req, res) => {
    //Vacía un carrito y lo elimina.
    let { id } = req.params;
    id = parseInt(id);
    if (!isNaN(id)) {
      try {
        const msg = await cartApi.deleteById(id);
        res.status(200).json(msg);
      } catch (error) {
        res.status(500).json({ error });
      }
    } else {
      res.status(400).json({ error: 'El parámetro no es un número.' });
    }
  },
  getAllProductsFromCartById: async (req, res) => {
    //Me permite listar todos los productos guardados en el carrito
    let { id } = req.params;
    id = parseInt(id);
    // Se evalúa si la conversión a int del número recibido por parámetro es posible o no
    if (!isNaN(id)) {
      try {
        const productsFromCart = await cartApi.getProductsFromCartById(id);
        res.status(200).json(productsFromCart);
      } catch (error) {
        res.status(500).json({ error });
      }
    } else {
      res.status(400).json({ error: 'El parámetro no es un número.' });
    }
  },
  addProductToCartById: async (req, res) => {
    let { id, id_prod } = req.params;
    id = parseInt(id);
    id_prod = parseInt(id_prod);

    if (isNaN(id)) {
      res.status(400).json({ error: 'El id del carrito debe ser un número' });
    }
    if (isNaN(id_prod)) {
      res.status(400).json({ error: 'El id del producto debe ser un número' });
    }
    try {
      const product = await productsApi.getById(id_prod);
      try {
        const msg = await cartApi.saveProduct(id, product);
        res.status(200).json(msg);
      } catch (error) {
        res.status(500).json({ error });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  deleteProductFromCartById: async (req, res) => {
    let { id, id_prod } = req.params;
    id = parseInt(id);
    id_prod = parseInt(id_prod);

    if (isNaN(id)) {
      res.status(400).json({ error: 'El id del carrito debe ser un número' });
    }
    if (isNaN(id_prod)) {
      res.status(400).json({ error: 'El id del producto debe ser un número' });
    }
    try {
      const msg = await cartApi.deleteProduct(id, id_prod);
      res.status(200).json(msg);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default cartsController;
