import knex from 'knex';
import { LoggerError } from '../../config/log4.js';

const updateElementById = async (option, tableName, id, data) => {
  const db = knex(option);
  try {
    const element = await db.from(tableName).where({ id }).update(data);
    return element;
  } catch (error) {
    LoggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default updateElementById;