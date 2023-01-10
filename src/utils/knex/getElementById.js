import { LoggerError } from '../../config/log4.js';

const getElementById = async (db, tableName, id) => {
  try {
    const element = await db.from(tableName).select('*').where({ id });
    return element[0];
  } catch (error) {
    LoggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default getElementById;