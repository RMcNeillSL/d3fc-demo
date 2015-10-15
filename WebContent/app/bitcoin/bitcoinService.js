'use strict';

(function () {
	
	function BitcoinService($rootScope, $http) {
		
		// Save passed variables
		this.$http = $http;
		this.$rootScope = $rootScope;
	}
	
	BitcoinService.prototype = {
			getDataForCompany : function(companyCode, callback) {
				var startDate = "2009-09-11";
				var endDate = "2010-03-10";
				var completeQuery = "https://query.yahooapis.com/v1/public/yql?q=select Date, Open, Close from yahoo.finance.historicaldata where symbol = '" + companyCode +
									"' and startDate = '" + startDate + "' and endDate = '" + endDate + "'&format=json&env=http://datatables.org/alltables.env&callback=";
				console.log(completeQuery);
				this.$http.get(completeQuery).then(function(jsonResponse) {
					if (callback) { callback(jsonResponse); }
				}, function(errorResponse) {
					if (errorResponse.status !== 200) {
						console.log("ERROR.");		//TODO: Add more error checking
					}
				});
			}
// -- https://query.yahooapis.com/v1/public/yql?q=select Date, Open, Close from yahoo.finance.historicaldata where symbol = "YHOO" and startDate = "2009-09-11" and endDate = "2010-03-10"&format=json&env=http://datatables.org/alltables.env&callback=
//			      https://query.yahooapis.com/v1/public/yql?q=select Open, Close from yahoo.finance.historicaldata where symbol = "YHOO" and startDate = "2009-09-11" and endDate = "2010-03-10" & env=http://datatables.org/alltables.env
	}
	
	BitcoinService.$inject = ['$rootScope', '$http'];
	
	angular.module('bitCoinApp.bitcoin.module').service('bitCoinApp.bitcoin.service', BitcoinService);
}());