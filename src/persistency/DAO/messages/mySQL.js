import SQLContainer from '../../containers/SQLContainer.js';
import MsgDTO from '../../DTO/msgDTO.js';
import insertNewElement from '../../../utils/knex/insertElement.js';
import readAllElements from '../../../utils/knex/readElements.js';
import getMessagesByEmail from '../../../utils/knex/getMessagesByEmail.js';
import { formatDateToMysql } from '../../../utils/dateFormaterToMySQL.js';

let instanceMySQL = null;
class MessagesDAOMySQL extends SQLContainer {
  constructor() {
    super();
    this.tableName = 'messages';
    this.createTable(this.tableName);
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
 
      await insertNewElement(this.db, this.tableName, data);
      return { success: 'El mensaje fue añadido al sistema.' };
    } catch (error) {
      throw error;
    }
  };

  readMsgs = async () => {
    try {
      const messages = await readAllElements(this.db, this.tableName);
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
      const messages = await getMessagesByEmail(this.db, this.tableName, email);
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