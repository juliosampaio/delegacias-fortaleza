(function(){
	'use strict';
	angular
		.module('delegacias-fortaleza.busca')
		.controller('Busca',Busca);

	Busca.$inject = ['$rootScope','Delegacias','mapaHelper','routeHelper'];

	function Busca($rootScope,Delegacias,mapaHelper,routeHelper){

		var controller = this;

		controller.categorias = getCategorias();
		controller.distancias = getDistancias();
		controller.pesquisar = pesquisar;
		controller.verNoMapa = verNoMapa;
		controller.setCoodenadasFiltro = setCoodenadasFiltro;
		controller.filtro= {distancia:5000,categoria:'Todas'};

		function verNoMapa(delegacia){
			Delegacias.mostrar = true;
			var geoURL = '/mapa?lat='+delegacia.lat+'&lon='+delegacia.lon;
			$rootScope.delegacia = delegacia;
			routeHelper.redirect(geoURL);
		}

		function setCoodenadasFiltro(lat,lon){			
			controller.filtro.coodenadas = {lat:lat,lon:lon};
		}

		function pesquisar(){
			$rootScope.showLoader = true;
			var desc = controller.filtro.descricao;
			var cate = (controller.filtro.categoria==="Todas"?undefined:controller.filtro.categoria);
			var coor = controller.filtro.coodenadas;
			var dist = (coor==undefined)?undefined:controller.filtro.distancia;
			Delegacias.consultar(desc,cate,coor,dist).then(function(delegacias){
				controller.delegacias = delegacias;
				$rootScope.showLoader = false;
			});
		}

		function getCategorias(){
			var categorias = [];
			var cats = ['Todas','Distrital','Especializada','Metropolitana','Municipal','Plantonista','Regional'];
			angular.forEach(cats,function(categoria){
				categorias.push({desc:categoria,value:categoria});
			});
			return categorias;
		}

		function getDistancias(){
			var distancias = [];
			for(var i = 1; i <= 10; i++){
				distancias.push({desc:i+' KM',value: i * 1000});
			}
			return distancias;
		}
	}
})();