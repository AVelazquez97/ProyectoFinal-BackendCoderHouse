const setProductSchema = (table) => {
  table.increments('id');
  table.string('name').notNullable();
  table.string('description').notNullable();
  table.string('code').unique().notNullable();
  table.string('thumbnail').notNullable();
  table.float('price').notNullable();
  table.integer('stock').notNullable();
  table.timestamp('timestamp').defaultTo(knex.fn.now());
  return table;
};

export default setProductSchema;