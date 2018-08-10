"use strict";

(function () {
	"use strict";

	angular.module("app").factory("homeService", homeService);

	homeService.$inject = ["$log", "$http"];
	function homeService($log, $http) {
		var service = {
			getCurrentPrices: getCurrentPrices
		};

		return service;

		////////////////
		function getCurrentPrices() {
			return $http.get("https://cors.io/?https://www1.electricityinfo.co.nz/dashboard/updates?chart_keys=prices_last_five_mins_map").then(complete).catch(failed);

			function complete(response) {
				return response.data;
			}

			function failed(error) {
				$log.error("XHR Failed for getCurrentPrices." + error);
			}
		}
	}
})();
