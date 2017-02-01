'use strict';

const Task = require('../model/task.js');
const User = require('../model/user.js');
const Twilo = require('../model/twillo.js');


// mongoose.connect(process.env.MONGODB_URI);

module.exports = function (req, res, next) {
  Task.find({ _id: req.params.id, completion: false})
  .then(  (tasks) => {
    tasks.forEach( function (task){
      User.findById(task.userID)
      .then(() => {
        Twilo.twilo();
      })
      .catch(next);
    });
  });
};


//find tasks that are false, if they are false, turn them true
