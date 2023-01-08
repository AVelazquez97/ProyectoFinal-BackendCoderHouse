import MongoDBContainer from '../../containers/mongoDBContainer.js';
import userModel from '../../../models/mongoose/users.model.js';
import UserDTO from '../../DTO/userDTO.js';

let instanceMongoDB = null;
class UsersDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = userModel;
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new UsersDAOMongoDB();
    }
    return instanceMongoDB;
  };

  createUser = async (userData) => {
    try {
      const newUser = await this.collectionName.create(userData);
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  getUserByEmail = async (email) => {
    try {
      const user = await this.collectionName.findOne(email);
      if (!user) {
        return null;
      }
      return UserDTO.toDTO(user);
    } catch (error) {
      throw error;
    }
  };

  getUserById = async (id) => {
    try {
      const user = await this.collectionName.findById(id);
      if (!user) {
        return null;
      }
      return UserDTO.toDTO(user);
    } catch (error) {
      throw error;
    }
  }
}

export default UsersDAOMongoDB;
