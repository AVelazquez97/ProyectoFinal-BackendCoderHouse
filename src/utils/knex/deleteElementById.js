import { LoggerError } from '../../config/log4.js';

const deletElementById = async (db, tableName, id) => {
  try {
    const element = await db.from(tableName).where({ id }).del();
    return element;
  } catch (error) {
    LoggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default deletElementById;