(function(){
	'use strict';

	angular
		.module('meumapa.openstreetmap')
		.config(configure);

	function configure(mapaHelperConfigProvider){
		mapaHelperConfigProvider.setInicializarMapa(inicializarMapa);
	}

	function inicializarMapa(lat,lon,containerID){
		var map = new ol.Map({
        target: containerID,
        layers: [
          new ol.layer.Tile({
            source: new ol.source.MapQuest({layer: 'sat'})
          })
        ],
        view: new ol.View({
          center: ol.proj.transform([lon,lat], 'EPSG:4326', 'EPSG:3857'),
          zoom: 11
        })
      });
	}

})();