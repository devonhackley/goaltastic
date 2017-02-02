'use strict';

require('dotenv').load();

var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
const client =require('twilio')(accountSid, authToken);

module.exports = exports = {};

exports.twilo = function(phone, message, callback){
  console.log(client.messages);
  client.messages.create({
    to: '+12066592953',
    from: '+15612796948',
    body: message,
  }, function(err, message) {
    callback(err, message);;
  });

};

exports.twilo();
