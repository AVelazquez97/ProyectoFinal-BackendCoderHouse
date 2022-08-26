import fs from 'fs';

class CartContainer {
  constructor(fileRoute) {
    this.fileRoute = fileRoute;
  }

  #viewFile = async () => {
    let carts = [];
    try {
      carts = await fs.promises.readFile(this.fileRoute, 'utf-8');
      if (carts === '') carts = '[]';
    } catch (error) {
      return [];
    }
    return JSON.parse(carts);
  };

  buildCart = async (_) => {
    try {
      const carts = await this.#viewFile();
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
      const carts = await this.#viewFile();
      let cartWithIdFounded = carts.find((item) => item.id === id);
      if (cartWithIdFounded) {
        let cartsWhitoutIdItem = carts.filter((item) => item.id !== id);
        await fs.promises.writeFile(
          this.fileRoute,
          JSON.stringify([...cartsWhitoutIdItem], null, 2)
        );
        return {
          msg: 'El carrito con el id indicado fue eliminado con éxito.',
        };
      } else {
        throw 'No existe un carrito con ese id.';
      }
    } catch (error) {
      throw `${error}`;
    }
  };

  // getAllProductsFromCartById ->  Me permite listar todos los productos guardados en el carrito

  getProductsFromCartById = async (id) => {
    try {
      const carts = await this.#viewFile();
      let cartWithId = carts.find((cart) => cart.id === id);
      if (!cartWithId) {
        throw 'No existe un carrito con ese id.';
      }
      if (cartWithId.products < 1) {
        throw 'El carrito no tiene productos aún.' ;
      }
      return cartWithId.products;
    } catch (error) {
      throw `${error}`;
    }
  };
  // addProductToCartById ->        Para incorporar productos al carrito por su id de producto
  // deleteProductFromCartById ->   Eliminar un producto del carrito por su id de carrito y de producto
}

export { CartContainer };
