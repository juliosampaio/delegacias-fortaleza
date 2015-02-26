(function(){
	'use strict';
	var core = angular.module('meumapa.core');
	//Inicializar material-design
	core.config(inicializarMaterialDesign);
	core.config(inicializarRouteHelper);

	function inicializarMaterialDesign(){
		//TODO: find a way to fix this
		setTimeout(function(){
			$.material.init();
		},1000);
	}

	inicializarRouteHelper.$inject = ['$routeProvider', 'routeHelperConfigProvider'];

	function inicializarRouteHelper($routeProvider, routeHelperConfigProvider){
		routeHelperConfigProvider.config.$routeProvider = $routeProvider;
		routeHelperConfigProvider.config.defaultURL = '/mapa';
	}

	//constantes
	var configuracoes = {
		 nomeDaAplicacao: 'Meu Mapa'
		,localizacaoPadrao : {lat: -3.00000,lon: -38.0000}
		,mapContainerID : 'meumapa-container-mapa'
	}
	core.value('configuracoes',configuracoes);
})();