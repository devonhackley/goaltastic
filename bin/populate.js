'use strict';
require('dotenv').config({path: `${__dirname}/../.env`});

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

const userMocks = require('../test/lib/user-mocks');
const goalMocks = require ('../test/lib/goal-mocks');
const taskMocks = require ('../test/lib/task-mocks');

function populateStuff(){
  userMocks.call(this, (err) => {
    if (err) return console.log(err);
    goalMocks.call(this, (err)=>{
      if (err) return console.log(err);
      taskMocks.call(this, (err)=>{
        if(err) return console.log(err);
        taskMocks.call(this, (err)=>{
          if(err) return console.log(err);
          taskMocks.call(this, (err)=>{
            if(err) return console.log(err);
            taskMocks.call(this, (err)=>{
              if(err) return console.log(err);
              taskMocks.call(this, (err)=>{
                if(err) return console.log(err);
                mongoose.disconnect();
              });
            });
          });
        });
      });
    });
  });
}

populateStuff.call({});
