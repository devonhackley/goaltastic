'use strict';

const Router = require('express').Router;
const User = require('../model/user.js');

const userRouter = module.exports = new Router();

userRouter.post('/', function(req, res, next){
  new User (req.body)
});
