'use strict';

require('./mock-env');
const expect = require('chai').expect;
const superagent = require('superagent');
const User = require('../model/user');
const Goal = require('../model/goal');
const mockUser = require('./lib/user-mocks');
const mockGoal = require('./lib/goal-mocks');
const controlServ = require('./lib/server-control');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing goal_router', function(){
  before(controlServ.startServ);
  after(controlServ.killServ);
  afterEach((done) => {
    Promise.all([
      User.remove({}),
      Goal.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/goals', function(){
    before(mockUser.bind(this));

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
  });

  describe('testing GET /api/goals/:id', function(){
    beforeEach(mockUser.bind(this));
    beforeEach(mockGoal.bind(this));

    it('should respond with a goal', (done) => {
      let url = `${baseURL}/api/gallery/${this.tempGoal._id.toString()}`;
      superagent.get(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal(this.tempGallery.title);
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        done();
      })
      .catch(done);
    });
    it('should respond with 401', (done) => {
      let url = `${baseURL}/api/gallery/${this.tempGallery._id.toString()}`;
      superagent.get(url)
      .set('Authorization', `Bearer badtoken`)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done);
    });
    it('should respond with 401', (done) => {
      let url = `${baseURL}/api/goals/${this.tempGoal._id.toString()}`;
      superagent.get(url)
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
