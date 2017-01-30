'use strict';

require('./mock-env.js');
const expect = require('chai').expect;
const superagent = require('superagent');
const serverControl = require('./lib/server-control.js')
const userMock = require('./lib/user-mocks.js');
const apiURL = `http://localhost:${process.env.PORT}`;
const User = require('../model/user.js');

// describe('Testing user model', function(){
//   it('should create a user obj', (done){
//
//   });
// });
