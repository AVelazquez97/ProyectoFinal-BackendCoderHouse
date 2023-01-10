import MongoDBContainer from '../../containers/mongoDBContainer.js';
import messageModel from '../../../models/mongoose/messages.model.js';
import MsgDTO from '../../DTO/msgDTO.js';

let instanceMongoDB = null;
class MessagesDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = messageModel;
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new MessagesDAOMongoDB();
    }
    return instanceMongoDB;
  };

  insertMsg = async (msgData) => {
    try {
      const data = {
        email: msgData.author.email,
        msgType: msgData.author.msgType,
        msg: msgData.msg,
      };
      await this.collectionName.create(data);
      return { success: 'El mensaje fue añadido al sistema.' };
    } catch (error) {
      throw error;
    }
  };

  readMsgs = async () => {
    try {
      const messages = await this.collectionName.find();
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
      const messages = await this.collectionName.find({ email });
      if (!messages.length) {
        throw 'No se encontraron mensajes en la base de datos.';
      }
      return MsgDTO.toDTO(messages);
    } catch (error) {
      throw error;
    }
  };
}

export default MessagesDAOMongoDB;
