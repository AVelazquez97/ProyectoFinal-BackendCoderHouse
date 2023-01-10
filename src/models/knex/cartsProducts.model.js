const setCartSchema = (table) => {
  table.increments('id');
  table.timestamp('timestamp');
  return table;
};

export default setCartSchema;
