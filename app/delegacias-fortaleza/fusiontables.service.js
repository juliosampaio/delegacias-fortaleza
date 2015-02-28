(function(){
	'use strict';
	angular
		.module('delegacias-fortaleza')
		.service('FusionTables',FusionTables);

	FusionTables.$inject = ['$http','fusionTablesConfig'];

	function FusionTables($http,fusionTablesConfig){
		var config = fusionTablesConfig;

		var fts = {
			consultarRegistrosProximos: consultarRegistrosProximos,
			consultarRegistros : consultarRegistros
		};
		return fts;

		function consultarRegistrosProximos(lat,lon,distancia){
			var sql = [];
			sql.push('SELECT * FROM '+config.TABLE_ID);
			sql.push('WHERE ST_INTERSECTS(Coordenadas,CIRCLE(LATLNG('+lat+','+lon+'),'+distancia+'))');
			return consultar(sql);
		}

		function consultarRegistros(condicoes){
			var sql = [];
			sql.push('SELECT * FROM '+config.TABLE_ID);

			if(angular.isArray(condicoes) && condicoes.length > 0){
				var where = [];
				sql.push('WHERE');
				angular.forEach(condicoes,function(condicao){
					if(condicao.campo==='Coordenadas'){
						where.push('ST_INTERSECTS(Coordenadas,CIRCLE(LATLNG('+condicao.lat+','+condicao.lon+'),'+condicao.distancia+'))');
					}else{
						condicao.valor = limparValor(condicao.valor);
						where.push(condicao.campo+' LIKE \'%25'+condicao.valor+'%25\'');
					}
				});
				sql.push(where.join(' AND '));
			}

			return consultar(sql);

		}

		function limparValor(valor){
			if(valor==undefined) return valor;

			valor = valor.replace(/%/g,"\\%");
			valor = valor.replace(/'/g,'\\"');
			valor = valor.replace(/"/g,'\\"');
			valor = encodeURIComponent(valor);

			return valor;
		}

		function consultar(sql){			
			var query = sql.join(' ');
			var url = montarQueryURL(query);
		    var registrosPromise = $http.jsonp(url);
		    return registrosPromise;
		}

		function montarQueryURL(query){
		    var url = config.API_URL+'query/?sql='+query+config.API_QUERY_TAIL;
		    return url;
		}
	}
})();