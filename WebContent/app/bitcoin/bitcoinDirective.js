'use strict';

angular.module('bitCoinApp.bitcoin.module').directive('bcaBitcoin', function () {
	return {
		replace: true,
		controller: 'bitCoinApp.bitcoin.controller',
		controllerAs: 'controller',
		templateUrl: 'app/bitcoin/bitcoin.html'
	};
});