'use strict';

require('./mock-env.js');
const expect = require('chai').expect;
const superagent = require('superagent');
const User = require('../model/user.js');
const userMocks = require('./lib/user-mocks.js');
const serverControl = require('./lib/server-control.js');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing auth-router', function(){
  before(serverControl.startServer);
  after(serverControl.killServer);
  afterEach((done) => {
    User.remove({})
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/signup', function(){
    it('should return a user', function(done){
      superagent.post(`${baseURL}/api/signup`)
      .send({
        username: 'goaltastic',
        email: 'goaltastic@goaltastic.com',
        password: '1234',
        phone: 1234567890,
      })
      .then(res => {
        console.log('token: ', res.text);
        expect(res.status).to.equal(200);
        expect(Boolean(res.text)).to.equal(true);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/login', function(){
    before(userMocks.bind(this));

    it('should respond with a token', (done) => {
      superagent.get(`${baseURL}/api/login`)
      .auth(this.tempUser.username, '1234')
      .then(res => {
        expect(res.status).to.equal(200);
        expect(Boolean(res.text)).to.equal(true);
        done();
      })
      .catch(done);
    });
  });
});
