
exports.up = function(knex, Promise) {
    return Promise.all([
        // knex.schema.createTableIfNotExists('CATEGORIA', function(table){
        //     table.increments();
        //     table.string('NOME').notNullable().unique();
        // }),
        knex.schema.createTableIfNotExists('LIBRO', function(table){
            table.increments();
            table.string('TITOLO').notNullable().unique();
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        // knex.schema.dropTableIfExists('CATEGORIA'),
        knex.schema.dropTableIfExists('LIBRO')
    ]);
};
