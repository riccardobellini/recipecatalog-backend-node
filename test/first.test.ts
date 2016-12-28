import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/app';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET api/first/languages', () => {

  it('responds with JSON array', () => {
    return chai.request(app).get('/api/first/languages')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.length(3);
      });
  });

  it('should include C++', () => {
    return chai.request(app).get('/api/first/languages')
      .then(res => {
        let sought = res.body.find(lang => lang.name === 'C++');
        expect(sought).to.exist;
        expect(sought).to.have.all.keys([
          'id',
          'name'
        ]);
      });
  });

});