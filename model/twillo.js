'use strict';

require('dotenv').load();

var accountSid = 'ACd9d9fcd13f8c0d8d2f0b15a88e90a6b9';
var authToken = 'a5df7363ba5a10f1569040aab7ab931f';
const client =require('twilio')(accountSid, authToken);

module.exports = exports = {};

exports.twilo = function(){
  console.log(client.messages);
  client.messages.create({
  	to: "+12066592953",
  	from: "+15612796948",
  	body: "Hey Devon!",
  }, function(err, message) {
  	console.log(err);
  });

};

exports.twilo();
