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

  buildCart = async (_) => {
    try {
      const carts = await this.viewFile();
      const timestamp = Date.now();
      const products = [];
      if (carts.length) {
        //Si ya existen carros en el fichero, estos se deben mantener y crear el nuevo
        await fs.promises.writeFile(
          this.fileRoute,
          JSON.stringify(
            [...carts, { id: carts.length + 1, timestamp, products }],
            null,
            2
          ),
          'utf-8'
        );

        return {
          msg: `El carrito con el id: ${carts.length + 1} fue creado.`,
        };
      } else {
        // Si es el primer carrito a crear, se le asigna el id 1.
        await fs.promises.writeFile(
          this.fileRoute,
          JSON.stringify([{ id: 1, timestamp, products }], null, 2),
          'utf-8'
        );

        return { msg: `El carrito fue creado con el id: 1.` };
      }
    } catch (error) {
      throw `${error}`;
    }
  };
  deleteById = async (id) => {
    //Vacía un carrito y lo elimina.
    try {
      const carts = await this.viewFile();
      let cartCounter = 1;
      let cartWithId = carts.find((item) => item.id === id);
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
    //Me permite listar todos los productos guardados en el carrito
    try {
      const carts = await this.viewFile();
      let cartWithId = carts.find((cart) => cart.id === id);
      if (!cartWithId) {
        throw 'No existe un carrito con ese id.';
      }
      if (cartWithId.products < 1) {
        throw 'El carrito no tiene productos aún.';
      }
      return cartWithId.products;
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

  saveProduct = async (id, id_prod) => {
    //Para incorporar productos a un carrito por su id de producto
    try {
      const { timestamp, name, description, code, thumbnail, price, stock } = await this.#getProduct(id_prod); 
      const cart = await this.#getCartById(id);
      
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
      return { msg: `El producto con el id: ${ cart.products.length } fue añadido al carrito.`};
    } catch (error) {
      throw `${error}`;
    }
  };

  deleteProduct = async (id, id_prod) => {
    //Eliminar un producto del carrito por su id de carrito y de producto
    try {
      let cart = await this.#getCartById(id);
      let productCounter = 1;

      if (cart.products < 1) {
        throw 'El carrito seleccionado no tiene productos.';
      }
      if (id_prod > cart.products.length) {
        throw 'El carrito no tiene un producto con el id seleccionado.';
      }

      const productsWithoutDeletedProduct = cart.products.filter(
        (product) => product.id !== id_prod
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

      return {
        msg: `El producto con el id: ${id_prod}, fue eliminado con éxito del carrito con el id: ${id}.`,
      };
    } catch (error) {
      throw `${error}`;
    }
  };
}

export default CartDAOFileSystem;
