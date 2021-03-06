'use strict';

const mongoose = require('mongoose');

const Goal = require('./goal.js');
const taskSchema = mongoose.Schema({
  title: {type:String, required:true},
  completion: {type:Boolean, default:false},
  userID: {type: mongoose.Schema.Types.ObjectId, required:true},
  goalID: {type: mongoose.Schema.Types.ObjectId, required: true},
});

taskSchema.pre('save', function(next){
  Goal.findById(this.goalID)
  .then(goal => {
    goal.taskID.push(this._id.toString());

    return goal.save();
  })
  .then(() => next())
  .catch(next);
});

module.exports = mongoose.model('task', taskSchema);
