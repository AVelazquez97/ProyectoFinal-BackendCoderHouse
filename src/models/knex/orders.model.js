const setOrderSchema = (table) => {
  table.increments('id');
  table.string('clientEmail').notNullable();
  table.string('clientAddress').notNullable();
  table.enu('status', ['Generada', 'Enviada']).defaultTo('Generada');
  table.timestamp('timestamp');
  return table;
};

export default setOrderSchema;
