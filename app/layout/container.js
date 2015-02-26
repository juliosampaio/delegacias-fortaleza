(function(){
	'use strict';

	angular
		.module('meumapa.layout')
		.controller('Container',Container);

	Container.$inject = ['$timeout'];

	function Container($timeout){
		var vm = this;
		vm.mostrarSplash = true;

		ativar();

		function ativar(){
			ocultarSplash();
		}

		function ocultarSplash(){
			$timeout(function() {
                vm.mostrarSplash = false;
            }, 1000);
		}
	}

})();