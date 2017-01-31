'use strict';

const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {type:String, required:true},
  completion: {type:Boolean, default:false},
  goalID: [{type: mongoose.Schema.Types.ObjectId, ref:'goal'}],
});

module.exports = mongoose.model('task', taskSchema);
