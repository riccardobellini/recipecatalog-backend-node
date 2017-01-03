
exports.up = function(knex, Promise) {
  return knex.schema.createTable('LIBRO', function(table){
    table.increments();
    table.string('TITOLO').notNullable().unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('LIBRO');
};
