'use strict';
require('dotenv').config({path: `${__dirname}/../.env`});

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
const Task = require('../model/task.js');
const User = require('../model/user.js');
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client =require('twilio')(accountSid, authToken);
// const Twilo = require('../model/twillo.js');

<<<<<<< HEAD
const twilobot = module.exports = function () {
  Task.find({completion: false})
  .then((tasks) => {
=======

const twilobot = module.exports = function (callback) {
  Task.find({completion:false})
  .then(  (tasks) => {
>>>>>>> 3c14a22cd7e75917ba012cada5fb0ea18cb959cf
    console.log('boyyyaaaaaaaaaaaaaaaaaaaaaaaaaaaa', tasks);
    tasks.forEach( function (task){
      User.findById(task.userID)
      .then((user) => {
        console.log(task);
<<<<<<< HEAD
        Twilo.twilo('+1' + user.phone, task.title, function(err, data){
          mongoose.disconnect();
        });
      });
=======
        sendText('+1' + user.phone,task.title, (err,message)=> {
          callback(err,message);
          mongoose.disconnect();
        });
      })
      .catch(err => callback(err));
>>>>>>> 3c14a22cd7e75917ba012cada5fb0ea18cb959cf
    });
  })
  .catch(err => callback(err));
};

function sendText(phone, message, callback){
  console.log(client.messages);
  client.messages.create({
    to: 2066592953,
    from: process.env.TWILIO_NUMBER,
    body: message,
  }, function(err, message) {
    callback(err,message);
  });

}

twilobot((err,message) => {
  if(err) return console.error(err);
  console.log(message);
});
