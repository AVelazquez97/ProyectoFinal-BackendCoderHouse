const setCartSchema = (table) => {
  table.increments('id');
  table.timestamp('timestamp').defaultTo(knex.fn.now());
  return table;
};

export default setCartSchema;
