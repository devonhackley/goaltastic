'use strict';

const debug = require('debug')('milestonetastic:milestone-mocks');
const Milestone = require('../../model/milestone');

module.exports = function(done){
  debug('milestone-mocks');
  new Milestone({
    title:  'test' + Math.floor(Math.random() * 100),
    start: Date.now(),
    userID: this.tempUser._id.toString(),
    milestoneID: this.tempMilestone._id.toString(),
  }).save()
  .then(milestone => {
    this.tempMilestone = milestone;
    done();
  })
  .catch(done);
};
