'use strict';

require('./mock-env');
const expect = require('chai').expect;
const superagent = require('superagent');
const User = require('../model/user');
const Goal = require('../model/goal');
const userMocks = require('./lib/user-mocks.js');
const goalMocks = require('./lib/goal-mocks');
const serverControl = require('./lib/server-control.js');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing goal_router', function(){
  before(serverControl.startServer);
  after(serverControl.killServer);
  after((done) => {
    Promise.all([
      User.remove({}),
      Goal.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/goals', function(){
    before(userMocks.bind(this));
    it('should respond with a goal', (done) => {
      superagent.post(`${baseURL}/api/goals`)
      .send({ title: 'testGoal' })
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('testGoal');
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        done();
      })
      .catch(done);
    });

    it('should respond with a 400 status code for bad request', (done) => {
      superagent.post(`${baseURL}/api/goals`)
      .send({})
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch((err) => {
        console.log(err.status);
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
    it('should respond with a 401 status code for bad request', (done) => {
      superagent.post(`${baseURL}/api/goals`)
      .send({title: 'testGoal'})
      .set('Authorization', `Bearer ${this.tempBlah}`)
      .then(done)
      .catch((err) => {
        console.log(err.status);
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });
    it('should respond with a 404 status code for bad request', (done) => {
      superagent.post(`${baseURL}/api/goal`)
      .send({title: 'testGoal'})
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch((err) => {
        console.log(err.status);
        expect(err.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/goals/:id', function(){
    beforeEach(userMocks.bind(this));
    beforeEach(goalMocks.bind(this));

    it('should respond with a goal', (done) => {
      let url = `${baseURL}/api/goals/${this.tempGoal._id.toString()}`;
      superagent.get(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal(this.tempGoal.title);
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        done();
      })
      .catch(done);
    });
    it('should respond with 401', (done) => {
      let url = `${baseURL}/api/goals/${this.tempGoal._id.toString()}`;
      superagent.get(url)
      .set('Authorization', `Bearer badtoken`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done);
    });
    it('should respond with a 404', (done) => {
      let url = `${baseURL}/api/goals/fakeID`;
      superagent.get(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(404);
        done();
      })
      .catch(done);
    });
  });
});
