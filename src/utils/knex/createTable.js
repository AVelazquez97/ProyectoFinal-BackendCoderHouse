import knex from 'knex';
import path from 'path';
import { LoggerInfo, LoggerError } from '../../config/log4.js';

const createTable = async (option, tableName) => {
  const db = knex(option);
  try {
    //Import dinámico. (Según el nombre de la tabla que reciba la función, importa el schema necesario)
    const { default: setSchema } = await import(path.join(process.cwd(), `/src/models/knex/${tableName}.model.js`));
    await db.schema.createTable(tableName, (table) => setSchema(table));
    LoggerInfo.info(`Tabla "${tableName}" creada correctamente.`);
  } catch (error) {
    LoggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default createTable;