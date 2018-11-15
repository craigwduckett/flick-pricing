"use strict";

(function() {
	"use strict";

	angular.module("app").factory("homeService", homeService);

	homeService.$inject = ["$log", "$http"];
	function homeService($log, $http) {
		var url =
			"https://www2.electricityinfo.co.nz/v1/prices?search_form[run_types][]=I&search_form[market_types][]=E&search_form[nodes][]=OTA2201&search_form[date_from]=" +
			moment().format("YYYY-MM-DD") +
			"&search_form[tp_from]=1&search_form[date_to]=" +
			moment().format("YYYY-MM-DD") +
			"&search_form[tp_to]=48&search_form[tp_roll_back]=1&search_form[tp_roll_fwd]=1";
		var service = {
			getCurrentPrices: getCurrentPrices
		};

		return service;

		////////////////
		function getCurrentPrices() {
			return $http
				.get("https://cors.io/?" + url)
				.then(complete)
				.catch(failed);

			function complete(response) {
				return response.data;
			}

			function failed(error) {
				$log.error("XHR Failed for getCurrentPrices." + error);
			}
		}
	}
})();
