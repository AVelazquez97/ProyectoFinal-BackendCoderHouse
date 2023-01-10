import knex from 'knex';
import MySQLConnection from '../../config/databases/connectionMySQL.js';
import createTable from '../../utils/knex/createTable.js';
 
class SQLContainer {
  constructor() {
    this.dbOptions = MySQLConnection.getMySQLConnectionInstance().getOptions();
    this.db = knex(dbOptions);
  }

  createTable = async (tableName) => {
    try {
      if (!(await this.db.schema.hasTable(tableName))) {
        await createTable(this.db, tableName);
      }
    } catch (error) {
      throw error;
    }
  };
}

export default SQLContainer;