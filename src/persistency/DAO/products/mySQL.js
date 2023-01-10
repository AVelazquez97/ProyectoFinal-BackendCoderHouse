import SQLContainer from '../../containers/sqlContainer.js';
import ProductDTO from '../../DTO/productDTO.js';

let instanceMySQL = null;
class ProductsDAOMySQL extends SQLContainer {
  constructor() {
    super();
    this.tableName = 'products';
    this.createTable(this.tableName);
  }

  static getInstance = () => {
    if (!instanceMySQL) {
      instanceMySQL = new ProductsDAOMySQL();
    }
    return instanceMySQL;
  };

  insertProduct = async (productData) => {
    try {
      const addedProduct = await this.db(this.tableName).insert(productData); 
      if(addedProduct[0]){
        throw new Error(
          'Error al insertar: no se pudo cargar el producto.'
        );
      }
      return { success: 'El producto fue añadido al sistema.' };
    } catch (error) {
      throw error.message;
    } finally {
      this.db.destroy();
    }
  };

  getAll = async () => {
    try {
      const products = await this.db.from(this.tableName).select('*');
      if (!products.length) {
        throw new Error(
          'Error al listar: no hay productos cargados en el sistema.'
        );
      }
      return ProductDTO.toDTO(products);
    } catch (error) {
      throw error.message;
    } finally {
      this.db.destroy();
    }
  };

  getById = async (id) => {
    try {
      const product = await this.db.from(this.tableName).select('*').where({ id });
      if (!product[0]) {
        throw new Error(
          'Error al listar: no se encontró el producto con el id indicado.'
        );
      }
      return ProductDTO.toDTO(product[0]);
    } catch (error) {
      throw error.message;
    } finally {
      this.db.destroy();
    }
  };

  searchByFilter = async (filters) => {
    try {
      const products = await this.collectionName.find({
        $or: [
          { name: { $regex: '.*' + filters.name + '.*', $options: 'i' } },
          {
            category: { $regex: '.*' + filters.category + '.*', $options: 'i' },
          },
          { code: filters.code },
          { price: { $gte: filters.minPrice, $lte: filters.maxPrice } },
          { stock: { $gte: filters.minStock, $lte: filters.maxStock } },
        ],
      });
      if (products.length < 1) {
        throw new Error(
          'Error al buscar: no hay productos que coincidan con los filtros.'
        );
      }
      return products;
    } catch (error) {
      throw error.message;
    }
  };


  updateProduct = async ({ id }, productData) => {
    try {
      const productUpdated = await this.db.from(this.tableName).where({ id }).update(productData);
      if (!productUpdated) {
        throw new Error(
          'Error al actualizar: no se encontró el producto con el id indicado.'
        );
      }
      return { success: 'El producto fue actualizado con éxito.' };
    } catch (error) {
      throw error.message;
    } finally {
      this.db.destroy();
    }
  };

  deleteProductById = async (id) => {
    try {
      const productDeleted = await this.db.from(this.tableName).where({ id }).del();
      if (!productDeleted) {
        throw new Error(
          'Error al borrar: no se encontró el producto con el id indicado.'
        );
      }
      return { success: 'El producto fue eliminado con éxito.' };
    } catch (error) {
      throw error.message;
    } finally {
      this.db.destroy();
    }
  };

}

export default ProductsDAOMySQL;