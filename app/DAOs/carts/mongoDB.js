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

  createCart = async (_) => {};

  deleteById = async (id) => {};

  getProductsFromCartById = async (id) => {};

  insertProduct = async (id, id_prod) => {};

  deleteProduct = async (id, id_prod) => {};
}

export default CartsDAOMongoDB;
