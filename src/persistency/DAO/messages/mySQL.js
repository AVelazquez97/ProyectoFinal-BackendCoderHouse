import MySQLConnection from '../../../config/databases/configMySQL.js';
import SQLContainer from '../../containers/SQLContainer.js';
import MsgDTO from '../../DTO/msgDTO.js';
import insertNewElement from '../../../utils/knex/insertElement.js';
import readAllElements from '../../../utils/knex/readElements.js';
import getMessagesByEmail from '../../../utils/knex/getMessagesByEmail.js';
import { formatDateToMysql } from '../../../utils/dateFormaterToMySQL.js';

const mysql = MySQLConnection.getMySQLConnectionInstance();

let instanceMySQL = null;
class MessagesDAOMySQL extends SQLContainer {
  constructor() {
    super(mysql.configData(), 'messages');
  }

  static getInstance = () => {
    if (!instanceMySQL) {
      instanceMySQL = new MessagesDAOMySQL();
    }
    return instanceMySQL;
  };

  insertMsg = async (msgData) => {
    try {
      const data = {
        email: msgData.author.email,
        msgType: msgData.author.msgType,
        msg: msgData.msg,
        fyh: formatDateToMysql(msgData.fyh),
      };
 
      const messageInsertedId = await insertNewElement(this.config, this.tableName, data);
      return { success: 'El mensaje fue añadido al sistema.' };
    } catch (error) {
      throw error;
    }
  };

  readMsgs = async () => {
    try {
      const messages = await readAllElements(this.config, this.tableName);
      if (!messages.length) {
        throw 'No se encontraron mensajes en la base de datos.';
      }
      return MsgDTO.toDTO(messages);
    } catch (error) {
      throw error;
    }
  };

  readMsgsByEmail = async (email) => {
    try {
      const messages = await getMessagesByEmail(this.config, this.tableName, email);
      if (!messages.length) {
        throw 'No se encontraron mensajes en la base de datos.';
      }
      return MsgDTO.toDTO(messages);
    } catch (error) {
      throw error;
    }
  };
}

export default MessagesDAOMySQL;