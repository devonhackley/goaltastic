'use strict';

const debug = require('debug')('goaltastic:task-mocks');
const Task = require('../../model/task');

module.exports = function(done){
  debug('task-mocks');
  new Task({
    title:  'test' + Math.floor(Math.random() * 100),
    completion: false,
    goalID: this.tempGoal._id.toString(),
  }).save()
  .then(task => {
    this.tempTask = task;
    done();
  })
  .catch(done);
};
