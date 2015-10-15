'use strict';

angular.module('bitCoinApp', [
  'ngRoute',
  'ngResource',
  'bitCoinApp.home.module'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {template: '<bca-home></bca-home>'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);