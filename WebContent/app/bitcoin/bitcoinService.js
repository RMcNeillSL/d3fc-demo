'use strict';

(function () {
	
	function BitcoinService($rootScope, $http, $resource) {
		// Save passed variables
		this.$http = $http;
		this.$rootScope = $rootScope;
		this.$resource = $resource;
	}
	
	BitcoinService.prototype = {
			getUnconfirmedCount: function (callback) {
				this.$http.get("https://blockchain.info/q/unconfirmedcount?cors=true").then(function(response) {
					if (callback) { callback (response.data); }
				}, function (errorResponse) {
					if (errorResponse.status !== 200) {
						console.log("ERROR.");		//TODO: Add more error checking
					}
				});
			},
			getDayPrice: function (callback) {
				this.$http.get("https://blockchain.info/q/24hrprice?cors=true").then(function(response) {
					if (callback) { callback (response.data); }
				}, function (errorResponse) {
					if (errorResponse.status !== 200) {
						console.log("ERROR.");		//TODO: Add more error checking
					}
				});
			},
			getMarketCap: function (callback) {
				this.$http.get("https://blockchain.info/q/marketcap?cors=true").then(function(response) {
					if (callback) { callback (response.data); }
				}, function (errorResponse) {
					if (errorResponse.status !== 200) {
						console.log("ERROR.");		//TODO: Add more error checking
					}
				});
			},
			getDayTransactions: function (callback) {
				this.$http.get("https://blockchain.info/q/24hrtransactioncount?cors=true").then(function(response) {
					if (callback) { callback (response.data); }
				}, function (errorResponse) {
					if (errorResponse.status !== 200) {
						console.log("ERROR.");		//TODO: Add more error checking
					}
				});
			},
			getDayCoins: function (callback) {
				this.$http.get("https://blockchain.info/q/24hrbtcsent?cors=true").then(function(response) {
					if (callback) { callback (response.data); }
				}, function (errorResponse) {
					if (errorResponse.status !== 200) {
						console.log("ERROR.");		//TODO: Add more error checking
					}
				});
			},
			getHashRate: function (callback) {
				this.$http.get("https://blockchain.info/q/hashrate?cors=true").then(function(response) {
					if (callback) { callback (response.data); }
				}, function (errorResponse) {
					if (errorResponse.status !== 200) {
						console.log("ERROR.");		//TODO: Add more error checking
					}
				});
			},
			getTransactionFeeData: function (callback) {
				this.$http.get("https://blockchain.info/charts/total-bitcoins?format=json&cors=true").then(function(response) {
					if (callback) { callback (response.data); }
				}, function (errorResponse) {
					if (errorResponse.status !== 200) {
						console.log("ERROR.");		//TODO: Add more error checking
					}
				});
			},
//			getTransactionFeeData: function (callback) {
//				this.$resource("https://blockchain.info/charts/transaction-fees?format=json", {}, {
//					get: {
//						method: "GET",
//						headers: { "Access-Control-Allow-Origin": "*" }
//					}
//				});
//			}
			
			//https://blockchain.info/latestblock							<- Returns height info as well
			//https://blockchain.info/block-height/379152?format=json		<- Change numbers for height increments
	}
	
	BitcoinService.$inject = ['$rootScope', '$http', '$resource'];
	
	angular.module('bitCoinApp.bitcoin.module').service('bitCoinApp.bitcoin.service', BitcoinService);
}());