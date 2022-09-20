import FileSystemContainer from '../../containers/fileSystemContainer.js';
import fs from 'fs';
import productsDAO from '../products/fileSystem.js';

let instanceFileSystem = null;

class CartDAOFileSystem extends FileSystemContainer {
  constructor() {
    super('app/dbFileSystem/carts.json');
    this.products = productsDAO.getInstance();
  }

  static getInstance() {
    if (!instanceFileSystem) {
      instanceFileSystem = new CartDAOFileSystem();
    }

    return instanceFileSystem;
  }
  #getCartById = async (id) => {
    try {
      const carts = await this.viewFile();
      const cartWithId = carts.find((cart) => cart.id === id);

      if (!cartWithId) {
        throw 'No existe un carrito con ese id.';
      }
      return cartWithId;
    } catch (error) {
      throw `${error}`;
    }
  };

  #updateCarts = async (cartData) => {
    try {
      let carts = await this.viewFile();
      const cartIndex = carts.findIndex((object) => object.id === cartData.id);

      carts[cartIndex] = cartData;
      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify(carts, null, 2),
        'utf-8'
      );
    } catch (error) {
      throw `${error}`;
    }
  };

  #getProduct = async (id_prod) => {
    try {
      const product = await this.products.getById(id_prod);
      return product;
    } catch (error) {
      throw `${error}`;
    }
  };

  createCart = async (_) => {
    try {
      const carts = await this.viewFile();
      const timestamp = Date.now();
      const products = [];

      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify(
          [...carts, { id: carts.length + 1, timestamp, products }],
          null,
          2
        ),
        'utf-8'
      );

      return { msg: `El carrito ha sido creado con éxito.` };
    } catch (error) {
      throw `${error}`;
    }
  };
  deleteById = async (id) => {
    // Es necesario refactorizar este método
    try {
      const carts = await this.viewFile();
      let cartCounter = 1;
      let cartWithId = carts.find((item) => item.id === Number(id));
      if (!cartWithId) {
        throw 'Carrito no encontrado.';
      }

      let cartsWithoutIdItem = carts.filter((item) => item.id !== id);
      const cartsWithIdsFixed = cartsWithoutIdItem.map((item) => {
        item.id = cartCounter;
        cartCounter++;
        return item;
      });

      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify([...cartsWithIdsFixed], null, 2)
      );
      return { msg: 'El carrito fue eliminado con éxito.' };
    } catch (error) {
      throw `${error}`;
    }
  };

  getProductsFromCartById = async (id) => {
    try {
      const carts = await this.viewFile();
      const cartWithId = carts.find((cart) => cart.id === Number(id));
      if (!cartWithId) {
        throw 'No existe un carrito con ese id.';
      }
      if (cartWithId.products < 1) {
        throw 'El carrito está vacío.';
      }
      return cartWithId.products;
    } catch (error) {
      throw `${error}`;
    }
  };

  insertProduct = async (id, id_prod) => {
    //Para incorporar productos a un carrito por su id de producto
    try {
      const { timestamp, name, description, code, thumbnail, price, stock } =
        await this.#getProduct(Number(id_prod));
      const cart = await this.#getCartById(Number(id));

      cart.products = [
        ...cart.products,
        {
          id: cart.products.length + 1,
          timestamp,
          name,
          description,
          code,
          thumbnail,
          price,
          stock,
        },
      ];
      this.#updateCarts(cart);
      return {
        msg: `El producto fue añadido al carrito.`,
      };
    } catch (error) {
      throw `${error}`;
    }
  };

  deleteProduct = async (id, id_prod) => {
    // Es necesario refactorizar este método
    try {
      let cart = await this.#getCartById(Number(id));
      let productCounter = 1;

      if (cart.products < 1) {
        throw 'El carrito seleccionado no tiene productos.';
      }
      if (id_prod > cart.products.length) {
        throw 'El carrito no tiene un producto con el id seleccionado.';
      }

      const productsWithoutDeletedProduct = cart.products.filter(
        (product) => product.id !== Number(id_prod)
      );

      const productsWithIdsFixed = productsWithoutDeletedProduct.map(
        (product) => {
          product.id = productCounter;
          productCounter++;
          return product;
        }
      );

      cart.products = productsWithIdsFixed;
      await this.#updateCarts(cart);

      return { msg: `El producto fue eliminado con éxito del carrito.` };
    } catch (error) {
      throw `${error}`;
    }
  };
}

export default CartDAOFileSystem;