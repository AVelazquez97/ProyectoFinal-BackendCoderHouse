import MongoDBContainer from '../../containers/mongoDBContainer.js';
import cartModel from '../../models/mongoose/carts.model.js';

let instanceMongoDB = null;
class CartsDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = cartModel;
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new CartsDAOMongoDB();
    }

    return instanceMongoDB;
  };

  insertProduct = async (data) => {
    return await this.collectionName.create(data);
  }

  getAll = async () => {
    const data = await this.collectionName.find();
    if (data.length > 0) {
      return data;
    } else {
      return [];
    }
  }

  getById = async (id) => {
    const data = await this.collectionName.findById(id);
    return data;
  }

  async updateProduct(id, data) {
    return await this.collectionName.findByIdAndUpdate({ _id: id }, data, {
      new: true,
    });
  }

  async deleteById(id) {
    let data = await this.collectionName.findByIdAndRemove(
      { _id: id },
      { rawResult: true }
    );
    return data.value;
  }
}

export default CartsDAOMongoDB ;
