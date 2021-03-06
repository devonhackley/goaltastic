'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('goaltastic:goal_router');
const Task = require('../model/task.js');
const bearerAuth = require('../lib/bear-auth.js');


const taskRouter = module.exports = new Router();

taskRouter.post('/api/tasks', bearerAuth, jsonParser,  function(req, res, next){
  debug('POST /api/tasks');
  if(!req.body.title)
    return next(createError(400, 'requires title'));
  new Task({
    title: req.body.title,
    completion:false,
    userID: req.user._id.toString(),
    goalID: req.body.goalID,
  }).save()
  .then(task => res.json(task))
  .catch(next);
});

taskRouter.get('/api/tasks/:id', bearerAuth, function(req, res, next){
  debug('GET /api/tasks/:id');
  Task.findOne({
    _id: req.params.id,
  })
  .then(task => res.json(task))
  .catch(err => {
    if(err) return next(createError(404, 'didn\'t find the task'));
  });
});



taskRouter.delete('/api/tasks/:id', bearerAuth, function(req,res,next){
  debug('DELETE /api/tasks/:id');
  Task.findByIdAndRemove(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(err => next(createError(404, err.message)));
});
