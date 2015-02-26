(function(){
	'use strict';

	angular
		.module('meumapa.layout')
		.controller('Navbar',Navbar);

	Navbar.$inject = ['$scope','$route','configuracoes','routeHelper','mapaHelper']

	function Navbar($scope,$route,configuracoes,routeHelper,mapaHelper){
		var controller = this;
		var rotas = routeHelper.getRoutes();
		controller.nomeDaAplicacao = configuracoes.nomeDaAplicacao;
		controller.menuItems = getMenuItems();
		controller.ehMenuAtivo = ehMenuAtivo;
		controller.logoPath = configuracoes.logoPath;

		controller.posicionarMapa = function(lat,lon){
			var localizacao = {lat:lat,lon:lon};
			if(menuAtivoEhMenuMapa()){
				mapaHelper.posicionarMapa(mapaHelper.mapa,localizacao);
			}else{
				var geoURL = '/mapa?lat='+localizacao.lat+'&lon='+localizacao.lon;
				routeHelper.redirect(geoURL);
			}
		};


		function getMenuItems(){
			return rotas.filter(function(r) {
                return r.config && r.config.posicao;
            }).sort(function(r1, r2) {
                return r1.config.posicao - r2.config.posicao;
            });
		}

		function menuAtivoEhMenuMapa(){
			var menuMapa = "Mapa";
			return $route.current.title.substr(0, menuMapa.length) === menuMapa;
		}

		function ehMenuAtivo(menu){
			if (!menu.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = menu.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'active' : '';
		}

	}

})();