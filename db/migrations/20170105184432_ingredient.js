
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('INGREDIENTE', function(table){
    table.increments();
    table.string('NOME').notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('INGREDIENTE');
};
