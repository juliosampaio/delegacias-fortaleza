(function(){
	'use strict';

	angular
		.module('meumapa.mapa')
		.controller('Mapa',Mapa);

	Mapa.$inject = ['$scope','$rootScope','$routeParams','mapaHelper','configuracoes'];

	function Mapa($scope,$rootScope,$routeParams,mapaHelper,configuracoes){
		var mapaController = this;
		mapaController.botoesLaterais = mapaHelper.botoesLaterais;
		mapaController.extraViews = mapaHelper.extraViews;
		mapaController.legenda = mapaHelper.legenda;

		iniciar();		
		
		function iniciar(){
			$rootScope.showLoader = true;
			if($routeParams.lat && $routeParams.lon){
				var loc = {lat:$routeParams.lat,lon:$routeParams.lon};
				inicializarMapa(loc);
			}else{
				mapaHelper.solicitarLocalizacao().then(function(loc){
					inicializarMapa(loc);
				});
			}
		}

		function inicializarMapa(loc){
			mapaHelper.inicializarMapa(loc.lat,loc.lon,configuracoes.mapContainerID).then(function(mapa){
				mapaHelper.setInstanciaMapa(mapa);
				mapaHelper.setLocalizacaoAtual(loc);
				$rootScope.$apply(function(){
					$rootScope.showLoader = false;
				});
			});
		}
		
	}

})();