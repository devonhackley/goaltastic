'use strict';
require('dotenv').config({path: `${__dirname}/../.env`});

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

const User = require('../model/user.js');
const Goal = require('../model/goal.js');
const Task = require('../model/task.js');

Promise.all([
  User.remove({}),
  Goal.remove({}),
  Task.remove({}),
])
.then(()=> mongoose.disconnect())
.catch(err => {
  console.error(err);
  mongoose.disconnect();
});
