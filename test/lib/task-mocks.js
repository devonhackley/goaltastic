'use strict';

const debug = require('debug')('goaltastic:task-mocks');
const Task = require('../../model/task.js');

module.exports = function(done){
  debug('task-mocks');
  new Task({
    title:  'test' + Math.floor(Math.random() * 100),
    completion: false,
    userID: this.tempUser._id.toString(),
    goalID: this.tempGoal._id.toString(),
  }).save()
  .then(task => {
    this.tempTask = task;
    console.log('this.tempTask====>', this.tempTask);
    done();
  })
  .catch(done);
};
