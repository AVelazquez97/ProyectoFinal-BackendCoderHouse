import knex from 'knex';
import createTable from '../../utils/knex/createTable.js';
import { LoggerError } from '../../config/log4.js';
 
class SQLContainer {
  constructor(dbConfigs, tableName) {
    this.db = knex(dbConfigs);
    this.config = dbConfigs;
    this.tableName = tableName;
    this.#createTable();
  }

  #createTable = async () => {
    try {
      if (!(await this.db.schema.hasTable(this.tableName))) {
        await createTable(this.config, this.tableName);
      }
    } catch (error) {
      LoggerError.error(error);
      throw error;
    }
  };
}

export default SQLContainer;