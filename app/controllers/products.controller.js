import { ProductContainer } from '../api/productContainer.js';
const productsApi = new ProductContainer('./app/database/products.json');

const productsController = {
  getAllProducts: async (req, res) => {
    try {
      const allProducts = await productsApi.getAll();
      res.status(200).json(allProducts);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getProductById: async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    
    // Se evalúa si la conversión a int del número recibido por parámetro es posible o no
    if (!isNaN(id)) {
      try {
        const product = await productsApi.getById(id);
        res.status(200).json(product);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(400).json({ error: 'El parámetro no es un número.' });
    }
  },
  addProduct: async (req, res) => {
    let { name, description, code, thumbnail, price, stock } = req.body;
    if (name && description && code && thumbnail && price && stock) {
      //si todos los campos están completos, se procede a ingresar el producto
      price = parseFloat(price);
      try {
        const msg = await productsApi.save({
          name,
          description,
          code,
          thumbnail,
          price,
          stock,
        });
        res.status(200).json(msg);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res
        .status(400)
        .json({ error: 'Algunos campos quedaron vacíos. Intenta nuevamente.' });
    }
  },
  updateProductById: async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    if (!isNaN(id)) {
      let { name, description, code, thumbnail, price, stock } = req.body;
      if (name && description && code && thumbnail && price && stock) {
        //si los tres campos del form están completos, se procede a ingresar el producto
        price = parseFloat(price);
        try {
          const msg = await productsApi.updateProduct({
            id,
            timestamp: Date.now(),
            name,
            description,
            code,
            thumbnail,
            price,
            stock,
          });
          res.status(200).json(msg);
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        res.status(400).json({
          error: 'Algunos campos quedaron vacíos. Intenta nuevamente.',
        });
      }
    } else {
      res.status(400).json({ error: 'El parámetro no es un número.' });
    }
  },
  deleteProductById: async (req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    if (!isNaN(id)) {
      try {
        const msg = await productsApi.deleteById(id);
        res.status(200).json(msg);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(400).json({ error: 'El parámetro no es un número.' });
    }
  },
};
export default productsController;
