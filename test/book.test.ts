process.env.NODE_ENV = 'test';

import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

var knex = require('../db/knex');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/v1/books', () => {

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
    return chai.request(app).get('/api/v1/books')
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('object');
      expect(res.body.results).to.be.an('array');
      expect(res.body.results).to.have.length(3);
    });
  });

  it('should include Sale & Pepe', () => {
    return chai.request(app).get('/api/v1/books')
    .then(res => {
      let sought = res.body.results.find(dt => dt.title === 'Sale & Pepe');
      expect(sought).to.exist;
      expect(sought).to.have.all.keys(['id', 'title']);
    });
  });

  it('should handle pagination', () => {
    return chai.request(app).get('/api/v1/books').query({offset: 0, limit: 2})
      .then(res => {
        expect(res.body.results).to.have.length(2);
        expect(res.body.pagination.hasMore).to.equal(true);
        expect(res.body.pagination.pageCount).to.equal(2);
        expect(res.body.pagination.perPage).to.equal(2);
        return chai.request(app).get('/api/v1/books').query({offset: 2, limit: 2})
      })
      .then(res => {
        expect(res.body.results).to.have.length(1);
        expect(res.body.pagination.hasMore).to.equal(false);
        expect(res.body.pagination.pageCount).to.equal(2);
        expect(res.body.pagination.perPage).to.equal(2);
      })
  });

    it('should filter correctly', () => {
      return chai.request(app).get('/api/v1/books').query({q: 'ucina', offset: 0, limit: 2})
        .then(res => {
            expect(res.body.results).to.have.length(2);
            let sought = res.body.results.find(dt => dt.title === 'Cucina Italiana');
            expect(sought).to.exist;
            sought = res.body.results.find(dt => dt.title === 'Cucina Naturale');
            expect(sought).to.exist;
            expect(res.body.pagination.hasMore).to.equal(false);
            expect(res.body.pagination.pageCount).to.equal(1);
            expect(res.body.pagination.perPage).to.equal(2);
            return chai.request(app).get('/api/v1/books').query({q: 'liana'})
        })
        .then(res => {
            expect(res.body.results).to.have.length(1);
            expect(res.body.pagination.hasMore).to.equal(false);
        });
    });

});


describe('GET api/v1/books/:id', () => {

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

  it('should return a single book', () => {
    return chai.request(app).get('/api/v1/books/1')
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('title');
      expect(res.body.title).to.equal('Sale & Pepe');
    });
  });

});



describe('POST api/v1/books', () => {

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
    return chai.request(app).post('/api/v1/books')
    .send({title: 'Da Noi'})
    .then(res => {
      expect(res.status).to.equal(201);
      expect(res).to.have.header('Location', /^\/api\/v1\/books\/\d+/);
    });
  });

  it('should not allow insertion of a duplicate entry', () => {
    return chai.request(app).post('/api/v1/books')
    .send({title: 'Da Noi'})
    .then(res => {
      return chai.request(app).post('/api/v1/books')
      .send({title: 'Da Noi'});
    })
    .then(res => {
      expect(res.status).to.equal(409);
    })
    .catch((err) => {
      expect(err.status).to.equal(409);
    });
  });

  it('should actually create the entry', () => {
    return chai.request(app).post('/api/v1/books')
    .send({title: 'Da Noi'})
    .then(res => {
      return chai.request(app).get(res.headers.location);
    })
    .then(res => {
      expect(res.status).to.equal(200);
      expect(res.body.title).to.equal('Da Noi');
    });
  });

});

describe('DELETE api/v1/books', () => {

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

  it('should delete the entries successfully', () => {
    return chai.request(app).delete('/api/v1/books?id=2,3')
    .then(res => {
      expect(res.status).to.equal(204);
      return chai.request(app).get('/api/v1/books');
    })
    .then((res) => {
      let sought = res.body.results.find(bk => bk.id === 2 || bk.id === 3);
      expect(sought).to.not.exist;
    });
  });

});


describe('DELETE api/v1/books/:id', () => {

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
    return chai.request(app).delete('/api/v1/books/2')
    .then(res => {
      expect(res.status).to.equal(204);
      return chai.request(app).get('/api/v1/books/2');
    })
    .then((res) => {
      expect(res.status).to.equal(404);
    })
    .catch((res) => {
      expect(res.status).to.equal(404);
    });
  });

  it('should delete just the specified entry', () => {
    return chai.request(app).delete('/api/v1/books/2')
    .then(res => {
      expect(res.status).to.equal(204);
      return chai.request(app).get('/api/v1/books');
    })
    .then((res) => {
      expect(res.status).to.equal(200);
      expect(res).to.be.json;
      expect(res.body.results).to.have.length(2);
    })
  });

});


describe('PUT api/v1/books/:id', () => {

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
    return chai.request(app).put('/api/v1/books/2')
    .send({title: 'Da Voi'})
    .then(res => {
      expect(res.status).to.equal(204);
      return chai.request(app).get('/api/v1/books/2');
    })
    .then((res) => {
      expect(res.status).to.equal(200);
      expect(res.body.title).to.equal('Da Voi');
    });
  });

  it('should not update if given an id field', () => {
    return chai.request(app).put('/api/v1/books/2')
    .send({id: 777, title: 'Antipasto'})
    .then(res => {
      expect(res.status).to.equal(422);
    })
    .catch((res) => {
      expect(res.status).to.equal(422);
    });
  });

});
