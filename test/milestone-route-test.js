'use strict';

require('./mock-env');
const expect = require('chai').expect;
const superagent = require('superagent');
const User = require('../model/user');
const MileStone = require('../model/milestone');
const mockUser = require('./lib/user-mocks');
const mockMileStone = require('./lib/mileStone-mocks');
const controlServ = require('./lib/server-control');

const baseURL = `http://localhost:${process.env.PORT}`;

describe('testing milestone_router', function(){
  before(controlServ.startServ);
  after(controlServ.killServ);
  afterEach((done) => {
    Promise.all([
      User.remove({}),
      MileStone.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/mileStones', function(){
    before(mockUser.bind(this));

    it('should respond with a goal', (done) => {
      superagent.post(`${baseURL}/api/mileStones`)
      .send({ title: 'testMileStone' })
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('testMileStone');
        expect(res.body.userID).to.equal(this.tempUser._id.toString());
        done();
      })
      .catch(done);
    });
  });

  describe('testing POST /api/mileStones/:id', function(){
    beforeEach(mockUser.bind(this));
    beforeEach(mockMileStone.bind(this));

    it('should respond with a milestone', (done) => {
      let url = `${baseURL}/api/gallery/${this.tempMileStone._id.toString()}`;
      superagent.post(url)
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
      let url = `${baseURL}/api/gallery/${this.tempGoal._id.toString()}`;
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
      let url = `${baseURL}/api/mileStones/${this.tempMileStone._id.toString()}`;
      superagent.get(url)
      .then(done)
      .catch(res => {
        expect(res.status).to.equal(401);
        done();
      })
      .catch(done);
    });
    it('should respond with a 404', (done) => {
      let url = `${baseURL}/api/mileStones/fakeID`;
      superagent.delete(url)
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
