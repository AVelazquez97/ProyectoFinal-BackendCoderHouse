const setMsgSchema = (table) => {
  table.increments('id');
  table.string("email").notNullable();
  table.string("msgType").notNullable();
  table.string("msg").notNullable();
  table.timestamp('fyh');
  return table;
};

export default setMsgSchema;

