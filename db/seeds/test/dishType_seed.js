exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('CATEGORIA').del()
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Dolci al cucchiaio'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Antipasti'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Primi Piatti - Pasta'});
    });
};