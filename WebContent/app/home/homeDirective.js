'use strict';

angular.module('bitCoinApp.home.module').directive('bcaHome', function () {
	return {
		replace: true,
		controller: 'bitCoinApp.home.controller',
		controllerAs: 'controller',
		templateUrl: 'app/home/home.html'
	};
});