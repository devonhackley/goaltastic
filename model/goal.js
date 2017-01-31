'use strict';

const mongoose = require('mongoose');


const goalSchema = mongoose.Schema({
  title: {type:String, required:true},
  start:{type:Date, default: Date.now, required:true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  taskID: [{type: mongoose.Schema.Types.ObjectId, ref: 'task'}],
});

module.exports = mongoose.model('goal', goalSchema);
