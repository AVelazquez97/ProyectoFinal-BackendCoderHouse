const setCartSchema = (table) => {
  table.increments('id');
  table.integer('clientId').unique().unsigned().notNullable();
  table.timestamp('timestamp').defaultTo(knex.fn.now());
  return table;
};

export default setCartSchema;
