'use strict';

const mongoose = require('mongoose');


const goalSchema = mongoose.Schema({
  title: {type:String, required:true},
  start:{type:Date, default: Date.now, required:true},
  userID: {type: mongoose.Schema.Types.ObjectId, required: true},
  // milestoneID: [{type: mongoose.Schema.Types.ObjectId, required: true}],
});

module.exports = mongoose.model('goal', goalSchema);
