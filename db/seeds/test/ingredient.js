
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
return knex('INGREDIENTE').del()
    .then(function () {
      return knex('INGREDIENTE').insert({NOME: 'Carciofi'});
    })
    .then(function () {
      return knex('INGREDIENTE').insert({NOME: 'Zucchine'});
    })
    .then(function () {
      return knex('INGREDIENTE').insert({NOME: 'Melanzane'});
    })
    .then(function () {
      return knex('INGREDIENTE').insert({NOME: 'Patate'});
    })
    .then(function () {
      return knex('INGREDIENTE').insert({NOME: 'Pomodori'});
    })
    .then(function () {
      return knex('INGREDIENTE').insert({NOME: 'Asparagi'});
    });
};
