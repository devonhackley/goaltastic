'use strict';

require('./mock-env');
const expect = require('chai').expect;
const superagent = require('superagent');
const Task = require('../model/task');
const userMocks = require('./lib/user-mocks');
const taskMocks = require('./lib/task-mocks');
const goalMocks = require('./lib/goal-mocks');
const serverControl = require('./lib/server-control.js');

const baseURL = `http://localhost:${process.env.PORT}`;


describe('testing task_router', function(){
  before(serverControl.startServer);
  after(serverControl.killServer);
  afterEach((done) => {
    Task.remove({})
    .then(() => done())
    .catch(done);
  });

  describe('testing POST /api/tasks', function(){
    before(userMocks.bind(this));
    before(goalMocks.bind(this));
    // before(taskMocks.bind(this));
    it('should respond with a tasks', (done) => {

      superagent.post(`${baseURL}/api/tasks`)
      .send({ title:'example tasks', completion: false, goalID: this.tempGoal._id.toString() })
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('example tasks');
        expect(res.body.completion).to.equal(false);
        expect(res.body.goalID).to.equal(this.tempGoal._id.toString());
        done();
      })
      .catch(done);
    });
    it('test 401, when no task header is provided', (done) => {
      superagent.post(`${baseURL}/api/tasks `)
      .send({title: 'example tasks',  completion: false })
      .set('Authorization', `Bearer ${this.aintmyToken}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });
    it('should return a 400 if missing field', (done) => {
      console.log(this.tempToken);
      superagent.post(`${baseURL}/api/tasks`)
      .send('{')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(400);
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/tasks/:id', function(){
    beforeEach(userMocks.bind(this));
    beforeEach(goalMocks.bind(this));
    beforeEach(taskMocks.bind(this));

    it('should respond with a tasks', (done) => {
      let url = `${baseURL}/api/tasks/${this.tempTask._id.toString()}`;
      superagent.get(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.body.title).to.equal(this.tempTask.title);
        expect(res.body.completion).to.equal(false);
        expect(res.body.goalID).to.equal(this.tempGoal._id.toString());
        done();
      })
      .catch(done);
    });

    it('test 401, when no task header is provided', (done) => {
      let url = `${baseURL}/api/tasks/${this.tempTask._id.toString()}`;
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
      let url = `${baseURL}/api/tasks/fakeID`;
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
  describe('testing DELETE /api/tasks/:id', function(){
    beforeEach(userMocks.bind(this));
    beforeEach(goalMocks.bind(this));
    beforeEach(taskMocks.bind(this));

    it('should return 204', (done) => {
      let url = `${baseURL}/api/tasks/${this.tempTask._id.toString()}`;
      superagent.delete(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(204);
        done();
      })
      .catch(done);
    });

    it('DELETE test 401, when no authorization header is provided', (done) => {
      let url = `${baseURL}/api/tasks/${this.tempTask._id.toString()}`;
      superagent.delete(url)
      .set('Authorization', `Bearer badtoken`)
      .then(done)
      .catch(err => {
        expect(err.status).to.equal(401);
        done();
      })
      .catch(done);
    });

    it('should respond with a 404', (done) => {
      let url = `${baseURL}/api/tasks/fakeID`;
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
