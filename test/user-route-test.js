'use strict';

require('./test-env.js');
const expect = require('chai').expect;
const superagent = require('superagent');
const serverControl = require('./lib/server-control.js')
const userMock = require('./lib/user-mock.js');
const apiURL = `http://localhost:${process.env.PORT}`;
const User = require('user.js');

describe('Testing user model', function(){
  it('should create a user obj', (done){

  });
});
