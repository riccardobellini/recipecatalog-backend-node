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
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Antipasti Veloci'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Antipasti Freddi'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Antipasti di Pesce'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Contorni Vegetariani'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Contorni con Verdure'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Torte Salate'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Pizze'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Polpette'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Primi Piatti - Riso'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Primi Piatti Veloci'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Minestre e Zuppe'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Gnocchi'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Polenta'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Pasta Fresca'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Secondi Piatti Veloci'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Secondi di Carne'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Carne Bianca'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Pesce'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Carni Rosse'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Pollo'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Dolci Veloci'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Frutta Fresca'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Frutta Secca'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Biscotti'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Crepes'});
    })
    .then(function () {
      return knex('CATEGORIA').insert({NOME: 'Muffin'});
    });
};