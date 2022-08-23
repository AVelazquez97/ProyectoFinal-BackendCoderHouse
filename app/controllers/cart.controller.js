import { cartContainer } from '../api/cartContainer.js';
const cartApi = new cartContainer('./database/cart.json');


const cartsController = {
  createCart: async (req, res) => { //Crea un carrito y devuelve su id.
    res.status(200).json({
      msg: 'Ruta para crear carrito',
    });
  },
  deleteCartById: async (req, res) => { //Vacía un carrito y lo elimina.
    res.status(200).json({
      msg: 'Ruta para eliminar carrito',
    });
  },
  getAllProductsFromCartById: async (req, res) => { //Me permite listar todos los productos guardados en el carrito
    res.status(200).json({
      msg: 'Ruta para obtener todos los productos de un carrito en específico',
    });
  }, 
  addProductToCartById: async (req, res) => { //Para incorporar productos al carrito por su id de producto
    res.status(200).json({
      msg: 'Ruta para agregar un producto al carrito utilizando la id del producto',
    });
  },
  deleteProductFromCartById: async (req, res) => { 
    res.status(200).json({
      msg: 'Ruta para eliminar un producto del carrito utilizando la id del producto',
    });
  }//Eliminar un producto del carrito por su id de carrito y de producto
};
export default cartsController;

