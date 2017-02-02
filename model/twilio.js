'use strict';


var accountSid = 'ACeb36d31bf12a614feecc6047847ae065';
var authToken = 'e028cab652384556a15ab486dc0668f0i';

var client = require('twilio')(accountSid,authToken);
console.log(client);

client.messages.create({
  to:'+12066592953',
  from:'+13609791609',
  body: 'Whats up?',
}, function(err,data) {
  if (err) return console.error(err);
  console.log(data);
});
