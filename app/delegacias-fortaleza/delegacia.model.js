(function(){
	'use strict';

	var MSG_LOCALIZACAO_IMPRECISA = 'Atenção! Esta é uma localização aproximada do endereço. Antes de se dirigir ao local tente obter informações através dos telefones indicados.';
	var MSG_LOCALIZACAO_EXATA = 'Esta é a localização exata do endereço. Antes de se dirigir ao local tente obter informações através dos telefones indicados.';

	var Delegacia = function(r){
		this.descricao = r.Nome;
		this.lat = r.Coordenadas.split(',')[0];
		this.lon = r.Coordenadas.split(',')[1];
		this.mensagem = '';
		angular.extend(this,r);
	};

	Delegacia.prototype = {

		getAlertClasses : function(){
			var classes = [];
			switch(this.Localizacao){
				case 'RANGE_INTERPOLATED':
					classes.push("text-danger");
					this.mensagem = MSG_LOCALIZACAO_IMPRECISA;
					break;
				case 'GEOMETRIC_CENTER':
					classes.push("text-danger");
					this.mensagem = MSG_LOCALIZACAO_IMPRECISA;
					break;
				case 'APPROXIMATE':
					classes.push("text-warning");
					this.mensagem = MSG_LOCALIZACAO_IMPRECISA;
					break;
				case 'ROOFTOP':
					classes.push("text-success");
					this.mensagem = MSG_LOCALIZACAO_EXATA;
					break;
			}
			return classes.join(' ');
		},
		getTelefones : function(){
			return this.Telefones.split('/');
		},
		getIcon: function(){
			return '/delegacias-fortaleza/icons/delegacia-'+this.Categoria.toLowerCase()+'.png';
		}

	};

	angular
		.module('delegacias-fortaleza')
		.value('Delegacia',Delegacia);
})();