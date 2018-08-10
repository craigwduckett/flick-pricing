(function() {
	"use strict";

	angular
		.module("app")
		.constant("SAMPLE_CONSTANT", "Sample constant")
		.constant("_", window._);
})();
