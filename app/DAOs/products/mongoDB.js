import mongoose from 'mongoose';
import MongoDBContainer from '../../containers/mongoDBContainer.js';
import productModel from '../../models/mongoose/products.model.js';

let instanceMongoDB = null;
class ProductsDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = productModel;
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new ProductsDAOMongoDB();
    }

    return instanceMongoDB;
  };

  insertProduct = async (data) => {
    try {
      return await this.collectionName.create(data);
    } catch (error) {
      throw `${error}`;
    }
  };

  getAll = async () => {
    try {
      const data = await this.collectionName.find();
      if (!data.length) {
        throw new Error(`Error al listar: no se encontraron productos.`);
      }
      return data;
    } catch (error) {
      throw error.message;
    }
  };

  getById = async (id) => {
    const data = await this.collectionName.findById(id);
    return data;
  };

  updateProduct = async (data) => {
    const {id} = data
    return await this.collectionName.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
  };

  deleteById = async (id) => {
    let data = await this.collectionName.findByIdAndRemove(
      { _id: id },
      { rawResult: true }
    );
    return data.value;
  };
}

export default ProductsDAOMongoDB;
