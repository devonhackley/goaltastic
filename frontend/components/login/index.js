'use strict';
require('./_login.scss');

require('angular').module('goaltastic')
.component('login', {
  template: require('./login.html'),
  bindings: {
    user:'<',
    handleSubmit:'<',
  },
});
