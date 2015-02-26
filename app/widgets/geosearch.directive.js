(function(){
	'use strict'
	angular
		.module('meumapa.widgets')
		.directive('meumapaGeoSearchField',geoSearchField);

	geoSearchField.$inject = ['$timeout'];

	function geoSearchField($timeout){
		var directive = {
			restrict: 'E',
			link : link,
			scope: {
				placeholder: '@',
				inputId: '@',
				coordenadasCarregadas: '&',
				classes: '@'
			},
			template: '<input id="{{inputId}}" type="search" class="form-control {{classes}}" placeholder="{{placeholder}}">'
		};
		return directive;

		function link(scope,element,attrs){
			$timeout(function(){
				$('#'+attrs.inputId).geocomplete().bind('geocode:result',function(event,result){
					if(result.geometry){
						scope.coordenadasCarregadas({lat:result.geometry.location.lat(),lon:result.geometry.location.lng()});
					}
				});
			});
		}
	}
})();