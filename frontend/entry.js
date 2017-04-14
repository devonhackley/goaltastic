'use strict';

require('./scss/main.scss');

const angular = require('angular');
const uiRouter = require('angular-ui-router');
const ngFileUpload = require('ng-file-upload');


angular.module('goaltastic', [uiRouter, ngFileUpload])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.when('', '/login');

  let routes = [
    {
      name:'login',
      url: '/login',
      template: '<admin></admin>',
    },
    {
      name:'signup',
      url: '/signup',
      template: '<signup></signup>',
    },
    {
      name:'login',
      url: '/login',
      template: '<admin></admin>',
    },
    {
      name: 'dashboard',
      url: 'dashboard',
      template:'<dashboard></dashboard>',
    },
  ];

  routes.forEach(route => $stateProvider.state(route)
);
}]);
