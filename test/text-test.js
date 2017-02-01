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






});
