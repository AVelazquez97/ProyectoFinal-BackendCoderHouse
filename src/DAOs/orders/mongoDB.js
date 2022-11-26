import mongoose from 'mongoose';
import MongoDBContainer from '../../containers/mongoDBContainer.js';
import orderModel from '../../models/mongoose/orders.model.js';
import cartModel from '../../models/mongoose/carts.model.js';

let instanceMongoDB = null;
class OrdersDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = orderModel;
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new OrdersDAOMongoDB();
    }

    return instanceMongoDB;
  };

  #findOrderById = async (id) => {
    try {
      const order = await this.collectionName.findById(id);
      return order;
    } catch (error) {
      throw [];
    }
  };

  // createOrder = async (_) => {
  //   try {
  //     await this.collectionName.create({
  //       timestamp: new Date(),
  //       products: [],
  //     });
  //     return { msg: 'El carrito ha sido creado con éxito.' };
  //   } catch (error) {
  //     throw error.message;
  //   }
  // };

  // deleteById = async (id) => {
  //   try {
  //     const cartDeleted = await this.collectionName.findByIdAndRemove(
  //       { _id: id },
  //       { rawResult: true }
  //     );
  //     if (!cartDeleted.value) {
  //       throw new Error(
  //         'Error al borrar: no existe un carrito con el id indicado.'
  //       );
  //     }
  //     return { msg: 'El carrito ha sido eliminado con éxito.' };
  //   } catch (error) {
  //     throw error.message;
  //   }
  // };

  // getAllOrders = async (id) => {
  //   try {
  //     const cart = await this.#findCartById(id);
  //     if (!cart) {
  //       throw new Error(
  //         'Error al listar: no existe un carrito con el id indicado.'
  //       );
  //     }

  //     const productsFromCart = await this.collectionName.findOne(
  //       { _id: id },
  //       { _id: 1, products: 1 }
  //     );

  //     if (!productsFromCart) {
  //       throw new Error(
  //         'Error al listar: el carrito seleccionado no tiene productos.'
  //       );
  //     }
  //     return productsFromCart;
  //   } catch (error) {
  //     throw error.message;
  //   }
  // };

  // insertProduct = async (idCart, idProd, quantity) => {
  //   try {
  //     let cart = await this.#findCartById(idCart);
  //     if (cart.length < 1) {
  //       throw new Error(
  //         'Error al insertar: no existe un carrito con el id indicado.'
  //       );
  //     }

  //     let productDetail = await this.#getProduct(idProd);
  //     if (productDetail.length < 1) {
  //       throw new Error(
  //         'Error al insertar: no existe un producto con el id indicado.'
  //       );
  //     }

  //     const qty = this.#compareStockAndQty(productDetail.stock, quantity);
  //     const productToInsert = {
  //       _id: mongoose.Types.ObjectId(productDetail.id),
  //       timestamp: productDetail.timestamp,
  //       name: productDetail.name,
  //       description: productDetail.description,
  //       code: productDetail.code,
  //       thumbnail: productDetail.thumbnail,
  //       price: productDetail.price,
  //       qty,
  //     };

  //     cart.products.push(productToInsert);
  //     await this.collectionName.findByIdAndUpdate({ _id: idCart }, cart, {
  //       new: true,
  //     });

  //     return { msg: 'El producto fue añadido al carrito.' };
  //   } catch (error) {
  //     throw error.message;
  //   }
  // };

  // deleteProduct = async (idCart, idProd) => {
  //   try {
  //     let cart = await this.#findCartById(idCart);
  //     if (cart.length < 1) {
  //       throw new Error(
  //         'Error al borrar: no existe un carrito con el id indicado.'
  //       );
  //     }

  //     const productDeleted = await this.collectionName.updateOne(
  //       {
  //         _id: mongoose.Types.ObjectId(idCart),
  //       },
  //       {
  //         $pull: {
  //           products: { _id: mongoose.Types.ObjectId(idProd) },
  //         },
  //       }
  //     );

  //     if (!productDeleted.modifiedCount) {
  //       throw new Error(
  //         'Error al borrar: no existe en el carrito un producto con el id indicado.'
  //       );
  //     }

  //     return { msg: 'El producto fue eliminado del carrito con éxito.' };
  //   } catch (error) {
  //     throw error.message;
  //   }
  // };

  // async create(cliente, carrito) {
  //   let productos = carrito.map((e) => {
  //     return {
  //       codigo: e.producto.codigo,
  //       nombre: e.producto.nombre,
  //       descripcion: e.producto.descripcion,
  //       precio: e.producto.precio,
  //       foto: e.producto.foto,
  //       cantidad: e.cantidad,
  //     };
  //   });
  //   await shoppingCartModel.deleteMany({ cliente: cliente.id });
  //   return await this.nombreColeccion.create({
  //     productos: productos,
  //     email: cliente.email,
  //     direccion: cliente.direccion,
  //   });
  // }

  // async read(query) {
  //   return await this.nombreColeccion.find(query);
  // }

  // async readId(id) {
  //   return await this.nombreColeccion.findById(id);
  // }

  // async update(id, data) {
  //   return await this.nombreColeccion.findByIdAndUpdate({ _id: id }, data, {
  //     new: true,
  //   });
  // }

  // async delete(id) {
  //   return await this.nombreColeccion.findByIdAndDelete(
  //     { _id: id },
  //     { rawResult: true }
  //   );
  // }
}

export default OrdersDAOMongoDB;

// getAllOrders,  getOrderById, updateOrderById, confirmOrder
