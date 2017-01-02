process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

var knex = require('../db/knex');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/dishTypes', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(function() {
      return knex.migrate.latest();
    })
    .then(function() {
      return knex.seed.run();
    });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  it('responds with JSON object with a result array', () => {
    return chai.request(app).get('/api/v1/dishTypes')
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('object');
      expect(res.body.results).to.be.an('array');
      expect(res.body.results).to.have.length(3);
    });
  });

  it('should include Antipasti', () => {
    return chai.request(app).get('/api/v1/dishTypes')
    .then(res => {
      let sought = res.body.results.find(dt => dt.name === 'Antipasti');
      expect(sought).to.exist;
      expect(sought).to.have.key('name');
    });
  });

  it('should handle pagination', () => {
    return chai.request(app).get('/api/v1/dishTypes').query({offset: 0, limit: 2})
      .then(res => {
        expect(res.body.results).to.have.length(2);
        expect(res.body.pagination.hasMore).to.equal(true);
        expect(res.body.pagination.pageCount).to.equal(2);
        expect(res.body.pagination.perPage).to.equal(2);
        return chai.request(app).get('/api/v1/dishTypes').query({offset: 2, limit: 2})
      })
      .then(res => {
        expect(res.body.results).to.have.length(1);
        expect(res.body.pagination.hasMore).to.equal(false);
        expect(res.body.pagination.pageCount).to.equal(2);
        expect(res.body.pagination.perPage).to.equal(2);
      })
  });


});


describe('GET api/v1/dishTypes/:id', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(function() {
      return knex.migrate.latest();
    })
    .then(function() {
      return knex.seed.run();
    });;
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  it('should return a single dish type', () => {
    return chai.request(app).get('/api/v1/dishTypes/2')
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name');
      expect(res.body.name).to.equal('Antipasti');
    });
  });


  
});
