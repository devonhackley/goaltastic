'use strict';

const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {type:String, required:true},
  completion: {type:Boolean, default:false},
  // milestoneID: [{type: mongoose.Schema.Types.ObjectId, required: true}],
});

module.exports = mongoose.model('task', taskSchema);
