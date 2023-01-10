import SQLContainer from '../../containers/sqlContainer.js';
import UserDTO from '../../DTO/userDTO.js';
import insertNewElement from '../../../utils/knex/insertElement.js';
import getUserById from '../../../utils/knex/getUserById.js';
import getUserByEmail from '../../../utils/knex/getUserByEmail.js';

let instanceMySQL = null;
class UsersDAOMySQL extends SQLContainer {
  constructor() {
    super();
    this.tableName = 'users';
    this.createTable(this.tableName);
  }

  static getInstance = () => {
    if (!instanceMySQL) {
      instanceMySQL = new UsersDAOMySQL();
    }
    return instanceMySQL;
  };

  createUser = async (userData) => {
    try {
      const newUserId = await insertNewElement(this.db, this.tableName, userData);
      const newUser = await this.getUserById(newUserId[0]);
      return newUser;
    } catch (error) {
      throw error;
    }
  };

  getUserByEmail = async (email) => {
    try {
      const user = await getUserByEmail(this.db, email);
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
      const user = await getUserById(this.db, id);
      if (!user) {
        return null;
      }
      return UserDTO.toDTO(user);
    } catch (error) {
      throw error;
    }
  }
}

export default UsersDAOMySQL;