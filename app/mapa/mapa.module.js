(function(){
	'use strict';
	angular.module('meumapa.mapa',[]);

	function mapaHelperDecorator($delegate){
		var original = $delegate.posicionarMapa;
		$delegate.posicionarMapa = function(mapa,loc){
			original(mapa,loc);
			$delegate.setLocalizacaoAtual(loc);
		}
		return $delegate;
	}

	angular
		.module('meumapa.mapa')
		.config(['$provide',function($provide){
			$provide.decorator("mapaHelper",mapaHelperDecorator);
		}]);
})();