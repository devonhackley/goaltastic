'use strict';

require('./mock-env');
const expect = require('chai').expect;
const superagent = require('superagent');
const User = require('../model/user');
const Task = require('../model/task');
const Goal = require('../model/goal');
const userMocks = require('./lib/user-mocks');
const taskMocks = require('./lib/task-mocks');
const goalMocks = require('./lib/goal-mocks');
const serverControl = require('./lib/server-control.js');

const baseURL = `http://localhost:${process.env.PORT}`;

describe.only('testing task_router', function(){
  before(serverControl.startServer);
  after(serverControl.killServer);
  after((done) => {
    Promise.all([
      User.remove({}),
      Task.remove({}),
      Goal.remove({}),
    ])
    .then(() => done())
    .catch(done);
  });
  describe('testing POST /api/tasks', function(){
    before(userMocks.bind(this));
    before(goalMocks.bind(this));
    it('should respond with a task', (done) => {
      superagent.post(`${baseURL}/api/tasks`)
      .send({ title: 'testTask' })
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('testTask');
        expect(res.body.goalID).to.equal(this.tempGoal._id.toString());
        done();
      })
      .catch(done);
    });
  });

  describe('testing GET /api/tasks/:id', function(){
    beforeEach(taskMocks.bind(this));
    beforeEach(goalMocks.bind(this));

    it('should respond with a task', (done) => {
      let url = `${baseURL}/api/tasks/${this.tempTask._id.toString()}`;
      superagent.get(url)
      .set('Authorization', `Bearer ${this.tempToken}`)
      .then(res => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal(this.tempTask.title);
        expect(res.body.goalID).to.equal(this.tempGoal._id.toString());
        done();
      })
      .catch(done);
    });
    it('should respond with 401', (done) => {
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
});
