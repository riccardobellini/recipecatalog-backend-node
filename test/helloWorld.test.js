"use strict";
var chai = require("chai");
var chaiHttp = require("chai-http");
var app_1 = require("../src/app");
chai.use(chaiHttp);
var expect = chai.expect;
describe('baseRoute', function () {
    it('should be json', function () {
        chai.request(app_1["default"]).get('/')
            .then(function (res) {
            expect(res.type).to.eql('application/json');
        });
    });
    it('should have a message prop', function () {
        chai.request(app_1["default"]).get('/')
            .then(function (res) {
            expect(res.body.message).to.eql('Hello World!');
        });
    });
});
