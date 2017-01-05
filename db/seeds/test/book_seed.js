exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('LIBRO').del()
    .then(function () {
      return knex('LIBRO').insert({TITOLO: 'Sale & Pepe'});
    })
    .then(function () {
      return knex('LIBRO').insert({TITOLO: 'Cucina Italiana'});
    })
    .then(function () {
      return knex('LIBRO').insert({TITOLO: 'Cucina Naturale'});
    });
};