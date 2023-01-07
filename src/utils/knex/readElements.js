import knex from 'knex';
import { LoggerError } from '../../config/log4.js';

const readAllElements = async (option, tableName) => {
  const db = knex(option);
  try {
    const records = await db.from(tableName).select('*');
    return records;
  } catch (error) {
    LoggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default readAllElements;
