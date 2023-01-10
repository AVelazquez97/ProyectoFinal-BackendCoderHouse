const setUserSchema = (table) => {
  table.increments('id');
  table.string('email').unique().notNullable();
  table.string('fullName').notNullable();
  table.integer('age').unsigned().notNullable();
  table.string('password').notNullable();
  table.string('phone').notNullable();
  table.string('address').notNullable();
  table.string('photo');
  return table;
};

export default setUserSchema;