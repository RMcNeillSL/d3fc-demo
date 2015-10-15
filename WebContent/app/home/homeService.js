'use strict';

(function () {
	
	function HomeService($rootScope, $http) {
		
		// Save passed variables
		this.$http = $http;
		this.$rootScope = $rootScope;
	}
	
	HomeService.prototype = {
			getDataForCompany : function(companyCode, callback, startDate, endDate) {
				if (!startDate) { startDate = "2009-09-11"; }
				if (!endDate) { endDate = "2011-03-10"; }
				var completeQuery = "https://query.yahooapis.com/v1/public/yql?q=select Date, Open, Close from yahoo.finance.historicaldata where symbol = '" + companyCode +
									"' and startDate = '" + startDate + "' and endDate = '" + endDate + "'&format=json&env=http://datatables.org/alltables.env&callback=";
				this.$http.get(completeQuery).then(function(jsonResponse) {
					console.log(jsonResponse);
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
	
	HomeService.$inject = ['$rootScope', '$http'];
	
	angular.module('bitCoinApp.home.module').service('bitCoinApp.home.service', HomeService);
}());