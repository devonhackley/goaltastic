'use strict';

const debug = require('debug')('goaltastic:goal-mocks');
const Goal = require('../../model/goal.js');

module.exports = function(done){
  debug('goal-mocks');
  new Goal({
    title:  'test' + Math.floor(Math.random() * 100),
    start: Date.now(),
    userID: this.tempUser._id.toString(),
  }).save()
  .then(goal => {
    this.tempGoal = goal;
    done();
  })
  .catch(done);
};
