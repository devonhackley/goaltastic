'use strict';

const Router = require('express').Router;
const User = require('../model/user.js');

const userRouter = module.exports = new Router();


userRouter.get('/api/user/:id', function(req,res,next){

});

userRouter.get('/api/users', function(req,res,next){

});

userRouter.delete('/api/user/:id', function(req,res,next){

});
