const setCartSchema = (table) => {
  table.increments('id');
  table.string('clientId').notNullable();
  table.timestamp('timestamp');
  //productos //.defaultTo([]);
  return table;
};

export default setCartSchema;
