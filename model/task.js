'use strict';

const mongoose = require('mongoose');
const Goal = require('../model/goal');

const taskSchema = mongoose.Schema({
  title: {type:String, required:true},
  completion: {type:Boolean, default:false},
  goalID: {type: mongoose.Schema.Types.ObjectId, ref:'goal'},
});

taskSchema.pre('save', function(next) {
  Goal.findById(this.goalID)
  .then(goal => {
    goal.tasks.push(this._id.toString());
    return goal.save();
  })
  .then(() => next())
  .catch(next);

});module.exports = mongoose.model('task', taskSchema);
