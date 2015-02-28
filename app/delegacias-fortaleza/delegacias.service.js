(function(){
	'use strict';
	angular
		.module('delegacias-fortaleza')
		.service('Delegacias',Delegacias);

	Delegacias.$inject = ['FusionTables','$q','Delegacia'];

	function Delegacias(FusionTables,$q,Delegacia){
		var service = {
			proximas : proximas,
			consultar : consultar,
			mostrar : false
		};
		return service;

		function consultar(descricao,categoria,coordenadas,distancia){
			var delegacias = $q.defer();
			var condicoes = montarCondicoes(descricao,categoria,coordenadas,distancia);
			FusionTables.consultarRegistros(condicoes).then(function(registros){
				var lista = parseDelegacias(registros);
				delegacias.resolve(instanciarDelegacias(lista));
			});
			return delegacias.promise;
		}

		function montarCondicoes(descricao,categoria,coordenadas,distancia){
			var condicoes = [];
			if(descricao){
				condicoes.push({campo:'Nome', valor: descricao});
			}
			if(categoria){
				condicoes.push({campo:'Categoria', valor: categoria});
			}
			if(coordenadas && coordenadas.lat && coordenadas.lon && distancia){
				condicoes.push({campo:'Coordenadas',lat : coordenadas.lat, lon : coordenadas.lon, distancia : distancia})
			}
			return condicoes;
		}

		function proximas(lat,lon,distancia){
			var delegacias = $q.defer();
			FusionTables.consultarRegistrosProximos(lat,lon,distancia).then(function(registros){
				var lista = parseDelegacias(registros);
				delegacias.resolve(instanciarDelegacias(lista));
			});
			return delegacias.promise;
		}

		function parseDelegacias(registros){
			var lista = [];
			angular.forEach(registros.data.rows,function(registro,indiceRegistro){
				var delegacia = {};
				angular.forEach(registro,function(campo,indiceCampo){
					delegacia[registros.data.columns[indiceCampo]] = campo;
				})
				lista.push(delegacia);
			});
			return lista;
		}

		function instanciarDelegacias(lista){
			var instancias = [];
			angular.forEach(lista,function(del,index){
				instancias.push(new Delegacia(del));
			});
			return instancias;
		}
	}
})();