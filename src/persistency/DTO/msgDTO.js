class MsgDTO {
  constructor({ id, email, msg, fyh, msgType }) {
    this.id = id;
    this.email = email;
    this.msg = msg;
    this.fyh = fyh;
    this.msgType = msgType;
  }

  #toJSON = () => {
    return {
      id: this.id,
      email: this.email,
      msg: this.msg,
      fyh: this.fyh,
      msgType: this.msgType,
    };
  };

  static toDTO = (messages) => {
    if (Array.isArray(messages)) {
      return messages.map((msg) => new MsgDTO(msg).#toJSON()); 
    } else return new MsgDTO(messages);
  };
}

export default MsgDTO;
