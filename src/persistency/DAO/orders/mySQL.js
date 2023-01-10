import SQLContainer from '../../containers/sqlContainer.js';
import OrderDTO from '../../DTO/orderDTO.js';
import insertNewElement from '../../../utils/knex/insertElement.js';
import readAllElements from '../../../utils/knex/readElements.js';
import getElementById from '../../../utils/knex/getElementById.js';
import updateElementById from '../../../utils/knex/updateElementById.js';
import deleteElementById from '../../../utils/knex/deleteElementById.js';

let instanceMySQL = null;
class OrdersDAOMySQL extends SQLContainer {
  constructor() {
    super();
    this.tableName = 'orders';
    this.tableNameOrderProducts = 'orderProducts';
    this.createTable(this.tableName);
    this.createTable(this.tableNameOrderProducts);
  }

  static getInstance = () => {
    if (!instanceMySQL) {
      instanceMySQL = new OrdersDAOMySQL();
    }
    return instanceMySQL;
  };

  insertProduct = async (productData) => {
    try {
      const addedProduct = await insertNewElement(this.db, this.tableName, productData);
      return addedProduct[0].toString();
    } catch (error) {
      throw error.message;
    }
  };

  readProducts = async () => {
    try {
      const products = await readAllElements(this.db, this.tableName);
      if (!products.length) {
        throw new Error(
          'Error al listar: no hay productos cargados en el sistema.'
        );
      }
      return ProductDTO.toDTO(products);
    } catch (error) {
      throw error.message;
    }
  };

  readProductById = async (id) => {
    try {
      const product = await getElementById(this.db, this.tableName, id);
      if (!product) {
        throw new Error(
          'Error al listar: no se encontró el producto con el id indicado.'
        );
      }
      return ProductDTO.toDTO(product);
    } catch (error) {
      throw error.message;
    }
  };

  updateProduct = async ({ id }, productData) => {
    try {
      const productUpdated = await updateElementById(this.db, this.tableName, id, productData);
      if (!productUpdated) {
        throw new Error(
          'Error al actualizar: no se encontró el producto con el id indicado.'
        );
      }
      return { success: 'El producto fue actualizado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };

  deleteProductById = async (id) => {
    try {
      const productDeleted = await deleteElementById(this.db, this.tableName, id);
      if (!productDeleted) {
        throw new Error(
          'Error al borrar: no se encontró el producto con el id indicado.'
        );
      }
      return { success: 'El producto fue eliminado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };

}

export default OrdersDAOMySQL;