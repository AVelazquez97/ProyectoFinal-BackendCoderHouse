import { LoggerInfo } from '../../config/log4.js';
import chatSocket from './chat.socket.js';
import privateChatSocket from './privateChat.socket.js';

export default (io) => {
  io.on('connection', async (socket) => {
    LoggerInfo.info(`Un cliente con el id: [${socket.id}] y la ip: [${socket.handshake.address}] se ha conectado.`);
    
    chatSocket(io, socket);
    privateChatSocket(io, socket);

    socket.on('disconnect', (_) => {
      LoggerInfo.info(`El cliente de id: [${socket.id}] y la ip: [${socket.handshake.address}] se ha desconectado.`);
    });
  });
} 