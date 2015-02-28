(function(){
	'use strict';
	var core = angular.module('delegacias-fortaleza');

	var api_url = 'https://www.googleapis.com/fusiontables/v1/';
	var table_id = '1DMMyrI2TlJhkzBObHKlY79H9ILZBwsx6EeIOZG65';
	var api_key = 'AIzaSyAaqPgmoZtcTfKnwOTVkZ0PvzsTLeynZVA';
	var api_query_tail = '&key='+api_key+'&callback=JSON_CALLBACK';

	var fusionTablesConfig = {
		API_URL: api_url,
		TABLE_ID: table_id,
		API_KEY: api_key,
		API_QUERY_TAIL: api_query_tail
	};

	core.value('fusionTablesConfig',fusionTablesConfig);

	core.run(function($rootScope,mapaHelper,Delegacias,configuracoes){

		configuracoes.nomeDaAplicacao = 'Delegacias Fortaleza';
		configuracoes.localizacaoPadrao = {lat:-3.7318616,lon:-38.5266704};
		configuracoes.logoPath = 'delegacias-fortaleza/icons/delegacias-fortaleza.png';

		mapaHelper.extraViews.push({id:'delegacias-fortaleza-popup-container',src:'delegacias-fortaleza/delegacia.html'});
		mapaHelper.extraViews.push({id:'delegacias-fortaleza-popup-telefones-container',src:'delegacias-fortaleza/botoes-laterais/popup-telefones.html'});
		mapaHelper.extraViews.push({id:'delegacias-fortaleza-popup-informativo-container',src:'delegacias-fortaleza/botoes-laterais/popup-informativo.html'});
		mapaHelper.extraViews.push({id:'delegacias-fortaleza-popup-legenda-container',src:'delegacias-fortaleza/botoes-laterais/popup-legenda.html'});		
		
		mapaHelper.addLocalizacaoAlteradaListener(localizacaoAlterada);
		mapaHelper.botoesLaterais = getBotoesLaterais();
		mapaHelper.legenda = getLegenda();

		function localizacaoAlterada(){
			var loc = mapaHelper.localizacaoAtual;
			mapaHelper.limparMapa(mapaHelper.pontos);

			if(Delegacias.mostrar){
				Delegacias.mostrar = false;
				var markers = mapaHelper.adicionarPontos(mapaHelper.mapa,[$rootScope.delegacia],function(delegacia){
					$rootScope.$apply(function(){
						$rootScope.delegacia = delegacia;
						$("#meumapa-modal-local").modal();
					});
				});
				mapaHelper.pontos = markers;
				return;
			}

			Delegacias.proximas(loc.lat,loc.lon,500000).then(function(delegacias){
				var markers = mapaHelper.adicionarPontos(mapaHelper.mapa,delegacias,function(delegacia){
					$rootScope.$apply(function(){
						$rootScope.delegacia = delegacia;
						$("#meumapa-modal-local").modal();
					});
				});
				mapaHelper.pontos = markers;
			})
		}

		function getBotoesLaterais(){
			var botoes = [];

			botoes.push({tipo:'btn-info',icone:'mdi-action-view-list',click:function(){
				$("#delegacias-fortaleza-modal-legenda").modal();
			}});

			botoes.push({tipo:'btn-success',icone:'mdi-communication-phone',click:function(){
				$("#delegacias-fortaleza-modal-telefones").modal();
			}});

			botoes.push({tipo:'btn-danger',icone:'mdi-alert-warning',click:function(){
				$("#delegacias-fortaleza-modal-informativo").modal();
			}});			
			return botoes;
		}

		function getLegenda(){
			var legenda = [];

			legenda.push({nome:'Delegacia Distrital',icone:'/delegacias-fortaleza/icons/delegacia-distrital.png',descricao:'Delegacia do bairro'});
			legenda.push({nome:'Delegacia Especializada',icone:'/delegacias-fortaleza/icons/delegacia-especializada.png',descricao:'Delegacia do bairro'});
			legenda.push({nome:'Delegacia Metropolitana',icone:'/delegacias-fortaleza/icons/delegacia-metropolitana.png',descricao:'Delegacia do bairro'});
			legenda.push({nome:'Delegacia Municipal',icone:'/delegacias-fortaleza/icons/delegacia-municipal.png',descricao:'Delegacia do bairro'});
			legenda.push({nome:'Delegacia Plantonista',icone:'/delegacias-fortaleza/icons/delegacia-plantonista.png',descricao:'Delegacia do bairro'});
			legenda.push({nome:'Delegacia Regional',icone:'/delegacias-fortaleza/icons/delegacia-regional.png',descricao:'Delegacia do bairro'});

			return legenda;
		}

	});

})();