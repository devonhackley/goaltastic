'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('goaltastic:goal_router');
const Goal = require('../model/goal');
const bearerAuth = require('../lib/bear-auth');
const goalRouter = module.exports = new Router();

goalRouter.post('/api/goals', bearerAuth, jsonParser,  function(req, res, next){
  debug('POST /api/goal');
  if(!req.body.title)
    return next(createError(400, 'requires title'));
  new Goal({
    title: req.body.title,
    userID: req.user._id.toString(),
  }).save()
  .then(goal => res.json(goal))
  .catch(next);
});

goalRouter.get('/api/goals/:id', bearerAuth, function(req, res, next){
  debug('GET /api/goals/:id');
  Goal.findOne({
    userID: req.user._id.toString(),
    _id: req.params.id,
  })
  .populate('goals')
  .then(goal => res.json(goal))
  .catch(err => {
    if(err) return next(createError(404, 'didn\'t find the goal'));
  });
});
