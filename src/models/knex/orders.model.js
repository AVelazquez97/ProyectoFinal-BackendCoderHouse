const setOrderSchema = (table) => {
  table.increments('id');
  table.string('clientEmail').notNullable();
  table.string('clientAddress').notNullable();
  table.enu('status', ['Generada', 'Enviada']).defaultTo('Enviada');
  table.timestamp('timestamp');
  //productos
  return table;
};

export default setOrderSchema;
