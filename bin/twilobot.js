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




const twilobot = module.exports = function (callback) {
  Task.find({completion:false})
  .then(  (tasks) => {
    tasks.forEach( function (task){
      User.findById(task.userID)
      .then((user) => {
        sendText('+1' + user.phone,task.title, (err,message)=> {
          callback(err,message);
          mongoose.disconnect();
        });
      })
      .catch(err => callback(err));
    });
  })
  .catch(err => callback(err));
};

function sendText(phone, message, callback){
  client.messages.create({
    to: phone,
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
