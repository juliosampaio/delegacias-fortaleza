(function(){
	'use strict';
	angular
		.module('meumapa.mapa')
		.provider('mapaHelperConfig',mapaHelperConfig)
		.factory('mapaHelper',mapaHelper);

	mapaHelper.$inject = ['$window', '$q', 'mapaHelperConfig','configuracoes'];

	function mapaHelper($window, $q, mapaHelperConfig,configuracoes){

		var helperService = {
			inicializarMapa : mapaHelperConfig.inicializarMapa,
			solicitarLocalizacao : solicitarLocalizacao,
			setInstanciaMapa : setInstanciaMapa,
			setLocalizacaoAtual: setLocalizacaoAtual,
			posicionarMapa: mapaHelperConfig.posicionarMapa,
			adicionarPontos: mapaHelperConfig.adicionarPontos,
			addLocalizacaoAlteradaListener: addLocalizacaoAlteradaListener,
			notificarLocalizacaoAlteradaListeners : notificarLocalizacaoAlteradaListeners,
			limparMapa : mapaHelperConfig.limparMapa,
			listeners : ['localizacaoAlterada'],
			extraViews : [],
			botoesLaterais : []
		};

		return helperService;

		function addLocalizacaoAlteradaListener(listener){
			if(!helperService.listeners['localizacaoAlterada']){
				helperService.listeners['localizacaoAlterada'] = [];
			}
			helperService.listeners['localizacaoAlterada'].push(listener);
		}

		function notificarLocalizacaoAlteradaListeners(){
			helperService.limparMapa();
			var listeners = helperService.listeners['localizacaoAlterada'] || [];
			for(var i = 0; i < listeners.length; i++){
				listeners[i]();
			}
		}

		function setLocalizacaoAtual(loc){
			helperService.localizacaoAtual = loc;
			helperService.notificarLocalizacaoAlteradaListeners();
		}

		function setInstanciaMapa(mapa){
			helperService.mapa = mapa;
		}

		function solicitarLocalizacao(){
			var coordenadas = $q.defer();
			$window.navigator.geolocation.getCurrentPosition(function(position){
				coordenadas.resolve({lat : position.coords.latitude, lon : position.coords.longitude});
			},function(erro){
				coordenadas.resolve(configuracoes.localizacaoPadrao);
			});
			return coordenadas.promise;
		}
	}

	function mapaHelperConfig(){
		
		var helperConfig = {};

		this.setInicializarMapa = function(f){
			helperConfig.inicializarMapa = f;
		}

		this.setPosicionarMapa = function(f){
			helperConfig.posicionarMapa = f;
		}

		this.setAdicionarPontos = function(f){
			helperConfig.adicionarPontos = f;
		}

		this.setLimparMapa = function(f){
			helperConfig.limparMapa = f;
		}

		this.$get = function(){
			return helperConfig;
		}
	}
})();