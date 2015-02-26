(function(){
	'use strict';

	angular
		.module('meumapa.local')
		.provider('localHelperConfig',localHelperConfig)
		.service('localHelper',localHelper);

		localHelper.$inject = ['localHelperConfig'];

		function localHelper(localHelperConfig){

		}

		function localHelperConfig(){

			var localHelperConfig = {};

			this.$get = function(){
				return localHelperConfig;
			}

		}



})();