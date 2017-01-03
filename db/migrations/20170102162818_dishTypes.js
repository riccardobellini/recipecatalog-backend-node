
exports.up = function(knex, Promise) {
  return knex.schema.createTable('CATEGORIA', function(table){
    table.increments();
    table.string('NOME').notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('CATEGORIA');
};
