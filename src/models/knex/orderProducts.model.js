const setOrderProductsSchema = (table) => {
  table.increments('id');
  table.integer('orderId').unsigned().notNullable();
  table.integer('productId').unsigned().notNullable();
  table.float('price').notNullable();
  table.integer('quantity').unsigned().notNullable();
  table.foreign('orderId').references('id').inTable('orders').onDelete('CASCADE');
  table.foreign('productId').references('id').inTable('products');
  return table;
};

export default setOrderProductsSchema;
