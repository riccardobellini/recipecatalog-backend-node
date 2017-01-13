process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

var knex = require('../db/knex');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/ingredients', () => {

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
    return chai.request(app).get('/api/v1/ingredients')
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('object');
      expect(res.body.results).to.be.an('array');
      expect(res.body.results).to.have.length(6);
    });
  });

  it('should include Zucchine', () => {
    return chai.request(app).get('/api/v1/ingredients')
    .then(res => {
      let sought = res.body.results.find(dt => dt.name === 'Zucchine');
      expect(sought).to.exist;
      expect(sought).to.have.all.keys(['id', 'name']);
    });
  });

  it('should handle pagination', () => {
    return chai.request(app).get('/api/v1/ingredients').query({offset: 0, limit: 3})
      .then(res => {
        expect(res.body.results).to.have.length(3);
        expect(res.body.pagination.hasMore).to.equal(true);
        expect(res.body.pagination.pageCount).to.equal(2);
        expect(res.body.pagination.perPage).to.equal(3);
        return chai.request(app).get('/api/v1/ingredients').query({offset: 3, limit: 3})
      })
      .then(res => {
        expect(res.body.results).to.have.length(3);
        expect(res.body.pagination.hasMore).to.equal(false);
        expect(res.body.pagination.pageCount).to.equal(2);
        expect(res.body.pagination.perPage).to.equal(3);
      })
  });


});


describe('GET api/v1/ingredients/:id', () => {

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
    return chai.request(app).get('/api/v1/ingredients/3')
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name');
      expect(res.body.name).to.equal('Melanzane');
    });
  });

});



describe('POST api/v1/ingredients', () => {

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

  it('should respond successfully', () => {
    return chai.request(app).post('/api/v1/ingredients')
    .send({name: 'Carote'})
    .then(res => {
      expect(res.status).to.equal(201);
      expect(res).to.have.header('Location', /^\/api\/v1\/ingredients\/\d+/);
    });
  });

  it('should not allow insertion of a duplicate entry', () => {
    return chai.request(app).post('/api/v1/ingredients')
    .send({name: 'Carote'})
    .then(res => {
      return chai.request(app).post('/api/v1/ingredients')
      .send({name: 'Carote'});
    })
    .then(res => {
      expect(res.status).to.equal(409);
    })
    .catch((err) => {
      expect(err.status).to.equal(409);
    });
  });

  it('should actually create the entry', () => {
    return chai.request(app).post('/api/v1/ingredients')
    .send({name: 'Carote'})
    .then(res => {
      return chai.request(app).get(res.headers.location);
    })
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('Carote');
    });
  });

});


describe('DELETE api/v1/ingredients/:id', () => {

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

  it('should delete the entry successfully', () => {
    return chai.request(app).delete('/api/v1/ingredients/2')
    .then(res => {
      expect(res.status).to.equal(204);
      return chai.request(app).get('/api/v1/ingredients/2');
    })
    .then((res) => {
      expect(res.status).to.equal(404);
    })
    .catch((res) => {
      expect(res.status).to.equal(404);
    });
  });

  it('should delete just the specified entry', () => {
    return chai.request(app).delete('/api/v1/ingredients/2')
    .then(res => {
      expect(res.status).to.equal(204);
      return chai.request(app).get('/api/v1/ingredients');
    })
    .then((res) => {
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(res.body.results).to.have.length(5);
    })
  });

});


describe('PUT api/v1/ingredients/:id', () => {

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

  it('should update the entry successfully', () => {
    return chai.request(app).put('/api/v1/ingredients/2')
    .send({name: 'Zucche'})
    .then(res => {
      expect(res.status).to.equal(204);
      return chai.request(app).get('/api/v1/ingredients/2');
    })
    .then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body.name).to.equal('Zucche');
    });
  });

  it('should not update if given an id field', () => {
    return chai.request(app).put('/api/v1/ingredients/2')
    .send({id: 777, name: 'Zucche'})
    .then(res => {
      expect(res.status).to.equal(422);
    })
    .catch((res) => {
      expect(res.status).to.equal(422);
    });
  });

});
