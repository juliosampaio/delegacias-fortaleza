(function() {
    'use strict';

    angular
        .module('meumapa.mapa')
        .run(appRun);

    appRun.$inject = ['routeHelper','mapaHelper']

    function appRun(routeHelper,mapaHelper) {
        routeHelper.addRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/mapa',
                config: {
                    templateUrl: 'mapa/mapa.html',
                    controller: 'Mapa',
                    controllerAs: 'mapa',
                    title: 'Mapa',
                    config: {
                        posicao: 1
                    }
                }
            }
        ];
    }
})();
