import knex from 'knex';
import { LoggerError } from '../../config/log4.js';

const getMessagesByEmail = async (option, email) => {
  const db = knex(option);
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