'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const User = require('../model/user.js');
const debug = require('debug')('goaltastic: auth-router');

const basicAuthMiddleware = require('../lib/basic-auth.js');

const userRouter = module.exports = new Router();

userRouter.post('/api/signup', jsonParser, function(req, res, next){
  debug('POST /api/signup');

  let password = req.body.password;
  delete req.body.password;
  new User(req.body)
  .generatePasswordHash(password)
  .then(user => {
    return user.generateToken();
  })
  .then(token => res.send(token))
  .catch(next);
});

userRouter.get('/api/login', basicAuthMiddleware,  function(req, res, next){
  debug('GET /api/login');
  console.log(req.user, 'RANDOM STRING');
  req.user.generateToken()
  .then(token => res.send(token))
  .catch(next);
});