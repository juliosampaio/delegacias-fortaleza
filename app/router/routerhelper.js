(function(){
	'use strict';
	 angular
	        .module('meumapa.router')
	        .provider('routeHelperConfig', routeHelperConfig)
	        .factory('routeHelper', routeHelper);

    routeHelper.$inject = ['$location', '$rootScope', '$route', 'routeHelperConfig'];

    function routeHelper($location, $rootScope, $route, routeHelperConfig){
    	var routes = [];
    	var $routeProvider = routeHelperConfig.config.$routeProvider;
    	var helper = {
    		addRoutes : addRoutes,
    		getRoutes : getRoutes,
            redirect : redirect
    	};
    	return helper;

    	function addRoutes(routes){
    		routes.forEach(function(route){
    			$routeProvider.when(route.url, route.config);
    		});
    		var defaultURL = routeHelperConfig.config.defaultURL || '/';
    		$routeProvider.otherwise({redirectTo: defaultURL});
    	}

		function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }

        function redirect(path){
            //TODO: find a way to fix this
            if ($rootScope.$root.$$phase != '$apply' && $rootScope.$root.$$phase != '$digest') {
                $rootScope.$apply(function(){
                    $location.url(path);
                });
            }else{
                $location.url(path);
            }
            
        }
    }

    function routeHelperConfig(){
    	this.config = {
    		//defaultURL : defaultURL
    		//$routeProvider : $routeProvider
    	};
    	this.$get = function(){
    		return {config : this.config};
    	};
    }


})();