'use strict';

const server = require('../../server.js');

const serverControl = module.exports = {};

serverControl.startServer = function(done){
  if(!server.isOn){
    server.listen(process.env.PORT, () => {
      server.isOn = true;
      console.log('Server is up! Party at port: ', process.env.PORT);
      done();

    });
    return;
  }
  done();
};

serverControl.killServer = function(done){
  console.log('sommmmmmmeeeeeethaaaaanggggggg');
  if(server.isOn){
    server.close(() => {
      server.isOn = false;
      console.log('The party has left, server down');
      done();
    });
    return;
  }
  done();
};
