"use strict";

(function() {
	"use strict";

	angular.module("app").component("home", {
		controller: HomeController,
		controllerAs: "vm",
		templateUrl: "app/home/home.view.html"
	});

	/** @ngInject */
	function HomeController(_, $log, $interval, homeService) {
		var vm = this;

		// Scope variables go here:
		// vm.variable = 'value';

		vm.loading = true;
		vm.networkCharge = 5.51;
		vm.flickVariableCharge = 1.58;
		vm.eaLevy = 0.113;
		vm.flickPrice = vm.networkCharge + vm.flickVariableCharge + vm.eaLevy;
		activate();

		function activate() {
			interval();
			homeService.getCurrentPrices().then(function(data) {
				/*var a = _.find(
					data.charts.prices_last_five_mins_map.data.nodes,
					function(o) {
						return o.gip_gxp_full == "OTA2201";
					}
				);*/
				var length = data.chart.series[0].values.length - 1;
				var price = data.chart.series[0].values[length][1];
				vm.value =
					vm.networkCharge + vm.flickVariableCharge + vm.eaLevy + price / 10;
				vm.lastUpdated = moment(data.chart.series[0].values[length][0]).format(
					"HH:mm"
				);
				vm.wholesalePrice = price / 10;
				vm.gauge = {
					upperLimit: 60,
					lowerLimit: 0,
					unit: " cents",
					precision: 4,
					ranges: [
						{
							min: 0,
							max: 12,
							color: "#673AB7"
						},
						{
							min: 12,
							max: 18,
							color: "#009688"
						},
						{
							min: 18,
							max: 24,
							color: "#4CAF50"
						},
						{
							min: 24,
							max: 30,
							color: "#CDDC39"
						},
						{
							min: 30,
							max: 36,
							color: "#FFEB3B"
						},
						{
							min: 36,
							max: 42,
							color: "#FFC107"
						},
						{
							min: 42,
							max: 48,
							color: "#FF9800"
						},
						{
							min: 48,
							max: 60,
							color: "#F44336"
						}
					]
				};
				vm.loading = false;
			});
		}

		function interval() {
			$interval(function() {
				vm.loading = true;
				homeService.getCurrentPrices().then(function(data) {
					var a = _.find(
						data.charts.prices_last_five_mins_map.data.nodes,
						function(o) {
							return o.gip_gxp_full == "OTA2201";
						}
					);
					vm.value =
						vm.networkCharge +
						vm.flickVariableCharge +
						vm.eaLevy +
						a.price / 10;
					vm.lastUpdated = a.run_time;
					vm.wholesalePrice = a.price / 10;
					vm.loading = false;
				});
			}, 300000);
		}
	}
})();
//# sourceMappingURL=../maps/home/home.component.js.map
