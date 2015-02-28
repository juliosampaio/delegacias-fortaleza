(function(){
	'use strict';
	angular
		.module('delegacias-fortaleza.sobre')
		.controller('Sobre',Sobre);

	function Sobre(){
		var controller = this;
		controller.colaboradores = getColoaboradores();

		function getColoaboradores(){
			var colaboradores = [];

			colaboradores.push({
				 nome : 'Julio Sampaio'
				,github : 'https://github.com/juliosampaio/'
				,contribuicao : 'Autor'
				,avatar: 'http://www.gravatar.com/avatar/ba578096028e7ec979bb1720693fd6de.png'
			});

			return colaboradores;
		}
	}
})();