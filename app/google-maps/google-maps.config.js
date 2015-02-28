(function(){
	'use strict';

	angular
		.module('meumapa.googlemaps')
		.config(configure);

	function configure(mapaHelperConfigProvider){
		mapaHelperConfigProvider.setInicializarMapa(inicializarMapa);
		mapaHelperConfigProvider.setPosicionarMapa(posicionarMapa);
		mapaHelperConfigProvider.setAdicionarPontos(adicionarPontos);
		mapaHelperConfigProvider.setLimparMapa(limparMapa)
	}

	function limparMapa(marker){
		angular.forEach(marker,function(ponto,indice){
			ponto.setMap(null);
		});
	}

	function inicializarMapa(lat,lon,containerID){
		
		var mapOptions = {
          zoom: 14,
          center: new google.maps.LatLng(lat,lon)
        };

		var map = new google.maps.Map(document.getElementById(containerID),mapOptions);
		var initInjector = angular.injector(['ng']);
		var $q = initInjector.get('$q');
		var mapa = $q.defer();

		google.maps.event.addListenerOnce(map, 'idle', function(){
		    mapa.resolve(map);
		});

		return mapa.promise;
	}

	function posicionarMapa(mapa,loc){
		 mapa.panTo(new google.maps.LatLng(loc.lat, loc.lon));
	}

	function adicionarPontos(mapa,pontos,eventoOnClick){
		var pontosAdicionados = [];	
		angular.forEach(pontos,function(ponto,key){
			var marker = new google.maps.Marker({
				map: mapa,
				position: new google.maps.LatLng(ponto.lat, ponto.lon),
				title: ponto.descricao,
				animation: google.maps.Animation.DROP,
				icon: ponto.getIcon()
			});
			google.maps.event.addListener(marker, 'click', function(){
				eventoOnClick(ponto);
				marker.setAnimation(google.maps.Animation.BOUNCE);
				setTimeout(function(){marker.setAnimation(null);},3000);
			});
			pontosAdicionados.push(marker);
		});
		return pontosAdicionados;
	}

})();