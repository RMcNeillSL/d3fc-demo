'use strict';

(function() {
	
	function HomeController($rootScope, $scope, $location, $window, homeService) {

		// Save passed variables
		this.$rootScope = $rootScope;
		this.$scope = $scope;
		this.$location = $location;
		this.$window = $window;
		this.homeService = homeService;

		// Demo graph
		var demoGraphCreate = function() {
			var data = fc.data.random.financial()(50);
			
			var chart = fc.chart.linearTimeSeries()
			    .xDomain(fc.util.extent(data, 'date'))
			    .yDomain(fc.util.extent(data, ['high', 'low']));
		
			var gridlines = fc.annotation.gridline();
			var candlestick = fc.series.candlestick();
		
			var multi = fc.series.multi()
			    .series([gridlines, candlestick]);
			chart.plotArea(multi);
			
			console.log(data);
		
			d3.select('#chart')
			    .append('svg')
			    .style({
			        height: '250px',
			        width: '600px'
			    })
			    .datum(data)
			    .call(chart);
		}
		
		demoGraphCreate();
		
		var googleStockGraphCreate = function(targetGraph, loadFunction) {
			
			// Render function
			function renderChart(data) {
						  
				var chart = fc.chart.linearTimeSeries()
					.xDomain(fc.util.extent(data, 'date'))
					.yDomain(fc.util.extent(data, ['open', 'close']))
				    .yTicks(5)
				    .yNice(5);
				
				var area = fc.series.area()
					.yValue(function(d) { return d.open; });
					  
				var line = fc.series.line()
					.yValue(function(d) { return d.open; });
					 
				var gridlines = fc.annotation.gridline()
					.yTicks(5)
					.xTicks(0);
					 
				var multi = fc.series.multi().series([gridlines, area, line]);
				
				chart.plotArea(multi);
				
				d3.select('#' + targetGraph).datum(data).call(chart);
				        
				  d3.selectAll('.y-axis text')
				  .style('text-anchor', 'end')
				  .attr('transform', 'translate(-3, -8)');
				//			  d3.selectAll('.x-axis text')
				//			      .attr('dy', undefined)
				//			      .style({'text-anchor': 'start', 'dominant-baseline': 'central'})
				//			      .attr('transform', 'translate(3, -' + (xAxisHeight / 2 + 3) + ' )');
			}
			
			// Loading function
			if (loadFunction) { loadFunction(renderChart); }
		}

		googleStockGraphCreate('time-series', function(renderChart) {

			d3.csv('stockLog/google_historical.csv').row(function(d) {
				var formattedTimestamp = 0;
				var breakdown = {day: 0, month: 0, year: 0};
				var stringBreakdown = {day: d.Timestamp.split("-")[0],
						month: d.Timestamp.split("-")[1], 
						year: d.Timestamp.split("-")[2]};
				
				breakdown.day = stringBreakdown.day;
				breakdown.year = "20" + stringBreakdown.year;
				var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
				for (var index = 0; index < months.length; index ++) {
					if (months[index] == stringBreakdown.month.toUpperCase()) {
						breakdown.month = String(index);
						if (index < 10) { breakdown.month = "0" + breakdown.month; }
					}
				}
				
//				console.log(breakdown);
				d.date = new Date(breakdown.year, breakdown.month, breakdown.day);
//				d.date = new Date(d.Timestamp * 1000);
				return d;
			}).get(function(error, rows) { renderChart(rows); });
		});
		
		this.homeService.getDataForCompany("YHOO", function(jsonData) {
			googleStockGraphCreate('get-request-test', function(renderChart) {
				
				// Construct data array
				var data = [];
				for (var index = 0; index < jsonData.data.query.results.length; index ++) {
					var dataItem = {
							close : jsonData.data.query.results[index]
					}
				}
				
				// Pass data to chart to load
				renderChart(data);
			});
		});
	} 

	HomeController.$inject = ['$rootScope', '$scope', '$location', '$window', 'bitCoinApp.home.service'];

	angular.module('bitCoinApp.home.module').controller( 'bitCoinApp.home.controller', HomeController);
}());