import { LoggerError } from '../../config/log4.js';

const insertNewElement = async (db, tableName, data) => {
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
