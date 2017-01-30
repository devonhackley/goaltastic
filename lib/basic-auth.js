'use strict';

const createError = require('http-errors');
const debug = require('debug')('goaltastic:basic-auth');

const User = require('../model/user.js');

module.exports = function(req, res, next){
  debug('basic auth middleware');

  let Authorization = req.headers.authorization;
  if(!Authorization)
    return next(createError(401, 'Did not send Authorization headers'));

  let basic = Authorization.split('Basic ')[1];
  let usernameAndPassword = new Buffer(basic, 'base64').toString().split(':');
  let username = usernameAndPassword[0];
  let password = usernameAndPassword[1];
  // find if User exists
  User.findOne({username:username})
  .then(user => {
    return user.comparePasswordHash(password)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      next(createError(401, err.message));
    });
  });

};
