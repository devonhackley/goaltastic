'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('goaltastic:milestone_router');
const Milestone = require('../model/milestone');
const bearerAuth = require('../lib/bear-auth');
const mileStoneRouter = module.exports = new Router();

mileStoneRouter.post('/api/milestones', bearerAuth, jsonParser,  function(req, res, next){
  debug('POST /api/mileStone');
  if(!req.body.title)
    return next(createError(400, 'requires title'));
  new Milestone({
    title: req.body.title,
    goalID: req.goal._id.toString(),
  }).save()
  .then(mileStone => res.json(mileStone))
  .catch(next);
});

mileStoneRouter.delete('/api/mileStones/:id', bearerAuth, function(req, res, next){
  debug('DELETE /api/mileStones/:id');
  Milestone.findByIdAndRemove({
    goalID: req.goal._id.toString(),
    _id: req.params.id,
  })
  .populate('mileStones')
  .then(mileStone => res.json(mileStone))
  .catch(err => {
    if(err) return next(createError(404, 'didn\'t find the mileStone'));
  });
});
