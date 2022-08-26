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
        res.status(500).json({error});
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
        res.status(500).json({error});
      }
    } else {
      res.status(400).json({ error: 'El parámetro no es un número.' });
    }
  },
  addProductToCartById: async (req, res) => {
    //Para incorporar productos al carrito por su id de producto
    res.status(200).json({
      msg: 'Ruta para agregar un producto al carrito utilizando la id del producto',
    });
  },
  deleteProductFromCartById: async (req, res) => {
    res.status(200).json({
      msg: 'Ruta para eliminar un producto del carrito utilizando la id del producto',
    });
  }, //Eliminar un producto del carrito por su id de carrito y de producto
};
export default cartsController;
