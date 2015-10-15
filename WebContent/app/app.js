'use strict';

angular.module('bitCoinApp', [
  'ngRoute',
  'ngResource',
  'bitCoinApp.home.module',
  'bitCoinApp.bitcoin.module'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {template: '<bca-home></bca-home>'});
	$routeProvider.when('/bitcoin', {template: '<bca-bitcoin></bca-bitcoin>'});
	$routeProvider.otherwise({redirectTo: '/home'});
}]);