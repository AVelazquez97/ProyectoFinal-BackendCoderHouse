import knex from 'knex';
import { LoggerError } from '../../config/log4.js';

const insertNewElement = async (option, tableName, data) => {
  const db = knex(option);
  try {
    return await db(tableName).insert(data);
  } catch (error) {
    LoggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default insertNewElement;
