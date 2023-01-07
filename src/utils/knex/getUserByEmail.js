import knex from 'knex';
import { LoggerError } from '../../config/log4.js';

const getUserByEmail = async (option, dataUser) => {
  const db = knex(option);
  try {
    const user = await db.from('users').select('*').where({ email: dataUser.email });
    return user[0];
  } catch (error) {
    LoggerError.error(error);
    throw error;
  } finally {
    db.destroy();
  }
};

export default getUserByEmail;