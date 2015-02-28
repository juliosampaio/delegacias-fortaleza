(function() {
    'use strict';

    angular
        .module('delegacias-fortaleza.busca')
        .run(appRun);

    appRun.$inject = ['routeHelper']

    function appRun(routeHelper) {
        routeHelper.addRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/busca',
                config: {
                    templateUrl: 'delegacias-fortaleza/busca/busca.html',
                    controller: 'Busca',
                    controllerAs: 'busca',
                    title: 'Busca Detalhada',
                    config: {
                        posicao: 2
                    }
                }
            }
        ];
    }
})();
