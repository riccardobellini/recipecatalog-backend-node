
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('ALTER TABLE `CATEGORIA` CHANGE COLUMN `id` `ID` INTEGER AUTO_INCREMENT;'),
    knex.schema.raw('ALTER TABLE `LIBRO` CHANGE COLUMN `id` `ID` INTEGER AUTO_INCREMENT;'),
    knex.schema.raw('ALTER TABLE `INGREDIENTE` CHANGE COLUMN `id` `ID` INTEGER AUTO_INCREMENT;')
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.raw('ALTER TABLE `CATEGORIA` CHANGE COLUMN `ID` `id` INTEGER AUTO_INCREMENT;'),
    knex.schema.raw('ALTER TABLE `LIBRO` CHANGE COLUMN `ID` `id` INTEGER AUTO_INCREMENT;'),
    knex.schema.raw('ALTER TABLE `INGREDIENTE` CHANGE COLUMN `ID` `id` INTEGER AUTO_INCREMENT;')
  ]);
};
