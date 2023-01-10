import { LoggerError } from '../../config/log4.js';

const readAllElements = async (db, tableName) => {
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
