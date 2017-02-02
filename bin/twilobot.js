'use strict';
require('dotenv').config({path: `${__dirname}/../.env`});

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
const Task = require('../model/task.js');
const User = require('../model/user.js');
const Twilo = require('../model/twillo.js');


const twilobot = module.exports = function () {
  Task.find({})
  .then(  (tasks) => {
    console.log('boyyyaaaaaaaaaaaaaaaaaaaaaaaaaaaa', tasks);
    tasks.forEach( function (task){
      User.findById(task.userID)
      .then((user) => {
        console.log(task);
        Twilo.twilo('+1' + user.phone,task.title);
        mongoose.disconnect();
      });
    });
  });
};

twilobot();

//find tasks that are false, if they are false, turn them true
