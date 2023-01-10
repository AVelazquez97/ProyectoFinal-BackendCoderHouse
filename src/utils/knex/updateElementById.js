import { LoggerError } from '../../config/log4.js';

const updateElementById = async (db, tableName, id, data) => {
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