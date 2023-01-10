import { LoggerError } from '../../config/log4.js';

const getMessagesByEmail = async (db, email) => {
  try {
    const messages = await db.from('users').select('*').where({ email });
    return messages;
  } catch (error) {
    LoggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default getMessagesByEmail;