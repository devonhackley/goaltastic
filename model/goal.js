'use strict';

const mongoose = require('mongoose');


const goalSchema = mongoose.Schema({
  title: {type:String, required:true},
  start:{type:String, required:true},
  milestoneID: [{type: mongoose.Schema.Types.ObjectId, required: true}],
});

module.exports = mongoose.model('goal', goalSchema);
