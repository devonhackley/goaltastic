'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
process.env.PORT = 3000;
process.env.MONGODB_URI = 'mongodb://localhost/testing';
// fake tokens to be written below
process.env.APP_SECRET = 'asdasdasdsa';
