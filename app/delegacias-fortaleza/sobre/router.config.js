(function() {
    'use strict';

    angular
        .module('delegacias-fortaleza.sobre')
        .run(appRun);

    appRun.$inject = ['routeHelper']

    function appRun(routeHelper) {
        routeHelper.addRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/sobre',
                config: {
                    templateUrl: 'delegacias-fortaleza/sobre/sobre.html',
                    controller: 'Sobre',
                    controllerAs: 'sobre',
                    title: 'Sobre',
                    config: {
                        posicao: 3
                    }
                }
            }
        ];
    }
})();
