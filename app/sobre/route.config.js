(function() {
    'use strict';

    angular
        .module('meumapa.sobre')
        .run(appRun);

    appRun.$inject = ['routeHelper','mapaHelper']

    function appRun(routeHelper,mapaHelper) {
        routeHelper.addRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/sobre',
                config: {
                    templateUrl: 'sobre/sobre.html',
                    controller: 'Sobre',
                    controllerAs: 'sobre',
                    title: 'Sobre',
                    config: {
                        posicao: 2
                    }
                }
            }
        ];
    }
})();
