!function(a,b,c,d){function e(b,c){this.options=a.extend(!0,{},f,c),this.input=b,this.$input=a(b),this._defaults=f,this._name="geocomplete",this.init()}var f={bounds:!0,country:null,map:!1,details:!1,detailsAttribute:"name",autoselect:!0,location:!1,mapOptions:{zoom:14,scrollwheel:!1,mapTypeId:"roadmap"},markerOptions:{draggable:!1},maxZoom:16,types:["geocode"],blur:!1},g="street_address route intersection political country administrative_area_level_1 administrative_area_level_2 administrative_area_level_3 colloquial_area locality sublocality neighborhood premise subpremise postal_code natural_feature airport park point_of_interest post_box street_number floor room lat lng viewport location formatted_address location_type bounds".split(" "),h="id place_id url website vicinity reference name rating international_phone_number icon formatted_phone_number".split(" ");a.extend(e.prototype,{init:function(){this.initMap(),this.initMarker(),this.initGeocoder(),this.initDetails(),this.initLocation()},initMap:function(){if(this.options.map){if("function"==typeof this.options.map.setCenter)return void(this.map=this.options.map);this.map=new google.maps.Map(a(this.options.map)[0],this.options.mapOptions),google.maps.event.addListener(this.map,"click",a.proxy(this.mapClicked,this)),google.maps.event.addListener(this.map,"zoom_changed",a.proxy(this.mapZoomed,this))}},initMarker:function(){if(this.map){var b=a.extend(this.options.markerOptions,{map:this.map});b.disabled||(this.marker=new google.maps.Marker(b),google.maps.event.addListener(this.marker,"dragend",a.proxy(this.markerDragged,this)))}},initGeocoder:function(){var b={types:this.options.types,bounds:this.options.bounds===!0?null:this.options.bounds,componentRestrictions:this.options.componentRestrictions};this.options.country&&(b.componentRestrictions={country:this.options.country}),this.autocomplete=new google.maps.places.Autocomplete(this.input,b),this.geocoder=new google.maps.Geocoder,this.map&&this.options.bounds===!0&&this.autocomplete.bindTo("bounds",this.map),google.maps.event.addListener(this.autocomplete,"place_changed",a.proxy(this.placeChanged,this)),this.$input.keypress(function(a){return 13===a.keyCode?!1:void 0}),this.$input.bind("geocode",a.proxy(function(){this.find()},this)),this.options.blur===!0&&this.$input.blur(a.proxy(function(){this.find()},this))},initDetails:function(){function b(a){e[a]=c.find("["+d+"="+a+"]")}if(this.options.details){var c=a(this.options.details),d=this.options.detailsAttribute,e={};a.each(g,function(a,c){b(c),b(c+"_short")}),a.each(h,function(a,c){b(c)}),this.$details=c,this.details=e}},initLocation:function(){var a,b=this.options.location;if(b){if("string"==typeof b)return void this.find(b);b instanceof Array&&(a=new google.maps.LatLng(b[0],b[1])),b instanceof google.maps.LatLng&&(a=b),a&&(this.map&&this.map.setCenter(a),this.marker&&this.marker.setPosition(a))}},find:function(a){this.geocode({address:a||this.$input.val()})},geocode:function(b){this.options.bounds&&!b.bounds&&(b.bounds=this.options.bounds===!0?this.map&&this.map.getBounds():this.options.bounds),this.options.country&&(b.region=this.options.country),this.geocoder.geocode(b,a.proxy(this.handleGeocode,this))},selectFirstResult:function(){var b="";a(".pac-item-selected")[0]&&(b="-selected");var c=a(".pac-container .pac-item"+b+":first span:nth-child(2)").text(),d=a(".pac-container .pac-item"+b+":first span:nth-child(3)").text(),e=c;return d&&(e+=" - "+d),this.$input.val(e),e},handleGeocode:function(a,b){if(b===google.maps.GeocoderStatus.OK){var c=a[0];this.$input.val(c.formatted_address),this.update(c),a.length>1&&this.trigger("geocode:multiple",a)}else this.trigger("geocode:error",b)},trigger:function(a,b){this.$input.trigger(a,[b])},center:function(a){a.viewport?(this.map.fitBounds(a.viewport),this.map.getZoom()>this.options.maxZoom&&this.map.setZoom(this.options.maxZoom)):(this.map.setZoom(this.options.maxZoom),this.map.setCenter(a.location)),this.marker&&(this.marker.setPosition(a.location),this.marker.setAnimation(this.options.markerOptions.animation))},update:function(a){this.map&&this.center(a.geometry),this.$details&&this.fillDetails(a),this.trigger("geocode:result",a)},fillDetails:function(b){var c={},d=b.geometry,e=d.viewport,f=d.bounds;a.each(b.address_components,function(b,d){d.types[0];a.each(d.types,function(a,b){c[b]=d.long_name,c[b+"_short"]=d.short_name})}),a.each(h,function(a,d){c[d]=b[d]}),a.extend(c,{formatted_address:b.formatted_address,location_type:d.location_type||"PLACES",viewport:e,bounds:f,location:d.location,lat:d.location.lat(),lng:d.location.lng()}),a.each(this.details,a.proxy(function(a,b){var d=c[a];this.setDetail(b,d)},this)),this.data=c},setDetail:function(a,b){b===d?b="":"function"==typeof b.toUrlValue&&(b=b.toUrlValue()),a.is(":input")?a.val(b):a.text(b)},markerDragged:function(a){this.trigger("geocode:dragged",a.latLng)},mapClicked:function(a){this.trigger("geocode:click",a.latLng)},mapZoomed:function(){this.trigger("geocode:zoom",this.map.getZoom())},resetMarker:function(){this.marker.setPosition(this.data.location),this.setDetail(this.details.lat,this.data.location.lat()),this.setDetail(this.details.lng,this.data.location.lng())},placeChanged:function(){var a=this.autocomplete.getPlace();if(a&&a.geometry)this.update(a);else if(this.options.autoselect){var b=this.selectFirstResult();this.find(b)}}}),a.fn.geocomplete=function(b){var c="plugin_geocomplete";if("string"==typeof b){var d=a(this).data(c)||a(this).geocomplete().data(c),f=d[b];return"function"==typeof f?(f.apply(d,Array.prototype.slice.call(arguments,1)),a(this)):(2==arguments.length&&(f=arguments[1]),f)}return this.each(function(){var d=a.data(this,c);d||(d=new e(this,b),a.data(this,c,d))})}}(jQuery,window,document),function(){angular.module("meumapa.router",["ngRoute"])}(),function(){"use strict";function a(a,b,c,d){function e(a){a.forEach(function(a){i.when(a.url,a.config)});var b=d.config.defaultURL||"/";i.otherwise({redirectTo:b})}function f(){for(var a in c.routes)if(c.routes.hasOwnProperty(a)){var b=c.routes[a],d=!!b.title;d&&h.push(b)}return h}function g(c){"$apply"!=b.$root.$$phase&&"$digest"!=b.$root.$$phase?b.$apply(function(){a.url(c)}):a.url(c)}var h=[],i=d.config.$routeProvider,j={addRoutes:e,getRoutes:f,redirect:g};return j}function b(){this.config={},this.$get=function(){return{config:this.config}}}angular.module("meumapa.router").provider("routeHelperConfig",b).factory("routeHelper",a),a.$inject=["$location","$rootScope","$route","routeHelperConfig"]}(),function(){"use strict";angular.module("meumapa",["meumapa.core","meumapa.layout","meumapa.mapa","meumapa.googlemaps","meumapa.widgets","delegacias-fortaleza","delegacias-fortaleza.busca","delegacias-fortaleza.sobre"])}(),function(){"use strict";angular.module("meumapa.widgets",[])}(),function(){"use strict";function a(a){function b(b,c,d){a(function(){$("#"+d.inputId).geocomplete().bind("geocode:result",function(a,c){c.geometry&&b.coordenadasCarregadas({lat:c.geometry.location.lat(),lon:c.geometry.location.lng()})})})}var c={restrict:"E",link:b,scope:{placeholder:"@",inputId:"@",coordenadasCarregadas:"&",classes:"@"},template:'<input id="{{inputId}}" type="search" class="form-control {{classes}}" placeholder="{{placeholder}}">'};return c}angular.module("meumapa.widgets").directive("meumapaGeoSearchField",a),a.$inject=["$timeout"]}(),function(){"use strict";angular.module("meumapa.layout",[])}(),function(){"use strict";function a(a){function b(){c()}function c(){a(function(){d.mostrarSplash=!1},1e3)}var d=this;d.mostrarSplash=!0,b()}angular.module("meumapa.layout").controller("Container",a),a.$inject=["$timeout"]}(),function(){"use strict";function a(a,b,c,d,e){function f(){return j.filter(function(a){return a.config&&a.config.posicao}).sort(function(a,b){return a.config.posicao-b.config.posicao})}function g(){var a="Mapa";return b.current.title.substr(0,a.length)===a}function h(a){if(!a.title||!b.current||!b.current.title)return"";var c=a.title;return b.current.title.substr(0,c.length)===c?"active":""}var i=this,j=d.getRoutes();i.nomeDaAplicacao=c.nomeDaAplicacao,i.menuItems=f(),i.ehMenuAtivo=h,i.logoPath=c.logoPath,i.posicionarMapa=function(a,b){var c={lat:a,lon:b};if(g())e.posicionarMapa(e.mapa,c);else{var f="/mapa?lat="+c.lat+"&lon="+c.lon;d.redirect(f)}}}angular.module("meumapa.layout").controller("Navbar",a),a.$inject=["$scope","$route","configuracoes","routeHelper","mapaHelper"]}(),function(){"use strict";angular.module("meumapa.core",["ngRoute","meumapa.router"])}(),function(){"use strict";function a(){setTimeout(function(){$.material.init()},1e3)}function b(a,b){b.config.$routeProvider=a,b.config.defaultURL="/mapa"}var c=angular.module("meumapa.core");c.config(a),c.config(b),b.$inject=["$routeProvider","routeHelperConfigProvider"];var d={nomeDaAplicacao:"Meu Mapa",localizacaoPadrao:{lat:-3,lon:-38},mapContainerID:"meumapa-container-mapa"};c.value("configuracoes",d)}(),function(){"use strict";function a(a){var b=a.posicionarMapa;return a.posicionarMapa=function(c,d){b(c,d),a.setLocalizacaoAtual(d)},a}angular.module("meumapa.mapa",[]),a.$inject=["$delegate"],angular.module("meumapa.mapa").config(["$provide",function(b){b.decorator("mapaHelper",a)}])}(),function(){"use strict";function a(a,b,c,d,e){function f(){if(b.showLoader=!0,c.lat&&c.lon){var a={lat:c.lat,lon:c.lon};g(a)}else d.solicitarLocalizacao().then(function(a){g(a)})}function g(a){d.inicializarMapa(a.lat,a.lon,e.mapContainerID).then(function(c){d.setInstanciaMapa(c),d.setLocalizacaoAtual(a),b.$apply(function(){b.showLoader=!1})})}var h=this;h.botoesLaterais=d.botoesLaterais,h.extraViews=d.extraViews,h.legenda=d.legenda,f()}angular.module("meumapa.mapa").controller("Mapa",a),a.$inject=["$scope","$rootScope","$routeParams","mapaHelper","configuracoes"]}(),function(){"use strict";function a(a){a.addRoutes(b())}function b(){return[{url:"/mapa",config:{templateUrl:"mapa/mapa.html",controller:"Mapa",controllerAs:"mapa",title:"Mapa",config:{posicao:1}}}]}angular.module("meumapa.mapa").run(a),a.$inject=["routeHelper","mapaHelper"]}(),function(){"use strict";function a(a,b,c,d){function e(a){j.listeners.localizacaoAlterada||(j.listeners.localizacaoAlterada=[]),j.listeners.localizacaoAlterada.push(a)}function f(){j.limparMapa();for(var a=j.listeners.localizacaoAlterada||[],b=0;b<a.length;b++)a[b]()}function g(a){j.localizacaoAtual=a,j.notificarLocalizacaoAlteradaListeners()}function h(a){j.mapa=a}function i(){var c=b.defer();return a.navigator.geolocation.getCurrentPosition(function(a){c.resolve({lat:a.coords.latitude,lon:a.coords.longitude})},function(){c.resolve(d.localizacaoPadrao)}),c.promise}var j={inicializarMapa:c.inicializarMapa,solicitarLocalizacao:i,setInstanciaMapa:h,setLocalizacaoAtual:g,posicionarMapa:c.posicionarMapa,adicionarPontos:c.adicionarPontos,addLocalizacaoAlteradaListener:e,notificarLocalizacaoAlteradaListeners:f,limparMapa:c.limparMapa,listeners:["localizacaoAlterada"],extraViews:[],botoesLaterais:[]};return j}function b(){var a={};this.setInicializarMapa=function(b){a.inicializarMapa=b},this.setPosicionarMapa=function(b){a.posicionarMapa=b},this.setAdicionarPontos=function(b){a.adicionarPontos=b},this.setLimparMapa=function(b){a.limparMapa=b},this.$get=function(){return a}}angular.module("meumapa.mapa").provider("mapaHelperConfig",b).factory("mapaHelper",a),a.$inject=["$window","$q","mapaHelperConfig","configuracoes"]}(),function(){"use strict";angular.module("meumapa.sobre",[])}(),function(){"use strict";function a(){}angular.module("meumapa.sobre").controller("Sobre",a)}(),function(){"use strict";function a(a){a.addRoutes(b())}function b(){return[{url:"/sobre",config:{templateUrl:"sobre/sobre.html",controller:"Sobre",controllerAs:"sobre",title:"Sobre",config:{posicao:2}}}]}angular.module("meumapa.sobre").run(a),a.$inject=["routeHelper","mapaHelper"]}(),function(){"use strict";angular.module("meumapa.local",[])}(),function(){"use strict";function a(){}function b(){var a={};this.$get=function(){return a}}angular.module("meumapa.local").provider("localHelperConfig",b).service("localHelper",a),a.$inject=["localHelperConfig"]}(),function(){"use strict";angular.module("meumapa.googlemaps",[])}(),function(){"use strict";function a(a){a.setInicializarMapa(c),a.setPosicionarMapa(d),a.setAdicionarPontos(e),a.setLimparMapa(b)}function b(a){angular.forEach(a,function(a){a.setMap(null)})}function c(a,b,c){var d={zoom:14,center:new google.maps.LatLng(a,b)},e=new google.maps.Map(document.getElementById(c),d),f=angular.injector(["ng"]),g=f.get("$q"),h=g.defer();return google.maps.event.addListenerOnce(e,"idle",function(){h.resolve(e)}),h.promise}function d(a,b){a.panTo(new google.maps.LatLng(b.lat,b.lon))}function e(a,b,c){var d=[];return angular.forEach(b,function(b){var e=new google.maps.Marker({map:a,position:new google.maps.LatLng(b.lat,b.lon),title:b.descricao,animation:google.maps.Animation.DROP,icon:b.getIcon()});google.maps.event.addListener(e,"click",function(){c(b),e.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){e.setAnimation(null)},3e3)}),d.push(e)}),d}angular.module("meumapa.googlemaps").config(a),a.$inject=["mapaHelperConfigProvider"]}(),function(){"use strict";angular.module("delegacias-fortaleza",["meumapa.core"])}(),function(){"use strict";var a=angular.module("delegacias-fortaleza"),b="https://www.googleapis.com/fusiontables/v1/",c="1DMMyrI2TlJhkzBObHKlY79H9ILZBwsx6EeIOZG65",d="AIzaSyAaqPgmoZtcTfKnwOTVkZ0PvzsTLeynZVA",e="&key="+d+"&callback=JSON_CALLBACK",f={API_URL:b,TABLE_ID:c,API_KEY:d,API_QUERY_TAIL:e};a.value("fusionTablesConfig",f),a.run(["$rootScope","mapaHelper","Delegacias","configuracoes",function(a,b,c,d){function e(){var d=b.localizacaoAtual;if(b.limparMapa(b.pontos),c.mostrar){c.mostrar=!1;var e=b.adicionarPontos(b.mapa,[a.delegacia],function(b){a.$apply(function(){a.delegacia=b,$("#meumapa-modal-local").modal()})});return void(b.pontos=e)}c.proximas(d.lat,d.lon,5e3).then(function(c){var d=b.adicionarPontos(b.mapa,c,function(b){a.$apply(function(){a.delegacia=b,$("#meumapa-modal-local").modal()})});b.pontos=d})}function f(){var a=[];return a.push({tipo:"btn-info",icone:"mdi-action-view-list",click:function(){$("#delegacias-fortaleza-modal-legenda").modal()}}),a.push({tipo:"btn-success",icone:"mdi-communication-phone",click:function(){$("#delegacias-fortaleza-modal-telefones").modal()}}),a.push({tipo:"btn-danger",icone:"mdi-alert-warning",click:function(){$("#delegacias-fortaleza-modal-informativo").modal()}}),a}function g(){var a=[];return a.push({nome:"Delegacia Distrital",icone:"/delegacias-fortaleza/icons/delegacia-distrital.png",descricao:"Delegacia do bairro"}),a.push({nome:"Delegacia Especializada",icone:"/delegacias-fortaleza/icons/delegacia-especializada.png",descricao:"Delegacia do bairro"}),a.push({nome:"Delegacia Metropolitana",icone:"/delegacias-fortaleza/icons/delegacia-metropolitana.png",descricao:"Delegacia do bairro"}),a.push({nome:"Delegacia Municipal",icone:"/delegacias-fortaleza/icons/delegacia-municipal.png",descricao:"Delegacia do bairro"}),a.push({nome:"Delegacia Plantonista",icone:"/delegacias-fortaleza/icons/delegacia-plantonista.png",descricao:"Delegacia do bairro"}),a.push({nome:"Delegacia Regional",icone:"/delegacias-fortaleza/icons/delegacia-regional.png",descricao:"Delegacia do bairro"}),a}d.nomeDaAplicacao="Delegacias Fortaleza",d.localizacaoPadrao={lat:-3.7318616,lon:-38.5266704},d.logoPath="delegacias-fortaleza/icons/delegacias-fortaleza.png",b.extraViews.push({id:"delegacias-fortaleza-popup-container",src:"delegacias-fortaleza/delegacia.html"}),b.extraViews.push({id:"delegacias-fortaleza-popup-telefones-container",src:"delegacias-fortaleza/botoes-laterais/popup-telefones.html"}),b.extraViews.push({id:"delegacias-fortaleza-popup-informativo-container",src:"delegacias-fortaleza/botoes-laterais/popup-informativo.html"}),b.extraViews.push({id:"delegacias-fortaleza-popup-legenda-container",src:"delegacias-fortaleza/botoes-laterais/popup-legenda.html"}),b.addLocalizacaoAlteradaListener(e),b.botoesLaterais=f(),b.legenda=g()}])}(),function(){"use strict";function a(a,b){function c(a,b,c){var d=[];return d.push("SELECT * FROM "+h.TABLE_ID),d.push("WHERE ST_INTERSECTS(Coordenadas,CIRCLE(LATLNG("+a+","+b+"),"+c+"))"),f(d)}function d(a){var b=[];if(b.push("SELECT * FROM "+h.TABLE_ID),angular.isArray(a)&&a.length>0){var c=[];b.push("WHERE"),angular.forEach(a,function(a){"Coordenadas"===a.campo?c.push("ST_INTERSECTS(Coordenadas,CIRCLE(LATLNG("+a.lat+","+a.lon+"),"+a.distancia+"))"):(a.valor=e(a.valor),c.push(a.campo+" LIKE '%25"+a.valor+"%25'"))}),b.push(c.join(" AND "))}return f(b)}function e(a){return void 0==a?a:(a=a.replace(/%/g,"\\%"),a=a.replace(/'/g,'\\"'),a=a.replace(/"/g,'\\"'),a=encodeURIComponent(a))}function f(b){var c=b.join(" "),d=g(c),e=a.jsonp(d);return e}function g(a){var b=h.API_URL+"query/?sql="+a+h.API_QUERY_TAIL;return b}var h=b,i={consultarRegistrosProximos:c,consultarRegistros:d};return i}angular.module("delegacias-fortaleza").service("FusionTables",a),a.$inject=["$http","fusionTablesConfig"]}(),function(){"use strict";var a="Atenção! Esta é uma localização aproximada do endereço. Antes de se dirigir ao local tente obter informações através dos telefones indicados.",b="Esta é a localização exata do endereço. Antes de se dirigir ao local tente obter informações através dos telefones indicados.",c=function(a){this.descricao=a.Nome,this.lat=a.Coordenadas.split(",")[0],this.lon=a.Coordenadas.split(",")[1],this.mensagem="",angular.extend(this,a)};c.prototype={getAlertClasses:function(){var c=[];switch(this.Localizacao){case"RANGE_INTERPOLATED":c.push("text-danger"),this.mensagem=a;break;case"GEOMETRIC_CENTER":c.push("text-danger"),this.mensagem=a;break;case"APPROXIMATE":c.push("text-warning"),this.mensagem=a;break;case"ROOFTOP":c.push("text-success"),this.mensagem=b}return c.join(" ")},getTelefones:function(){return this.Telefones.split("/")},getIcon:function(){return"/delegacias-fortaleza/icons/delegacia-"+this.Categoria.toLowerCase()+".png"}},angular.module("delegacias-fortaleza").value("Delegacia",c)}(),function(){"use strict";function a(a,b,c){function d(c,d,f,i){var j=b.defer(),k=e(c,d,f,i);return a.consultarRegistros(k).then(function(a){var b=g(a);j.resolve(h(b))}),j.promise}function e(a,b,c,d){var e=[];return a&&e.push({campo:"Nome",valor:a}),b&&e.push({campo:"Categoria",valor:b}),c&&c.lat&&c.lon&&d&&e.push({campo:"Coordenadas",lat:c.lat,lon:c.lon,distancia:d}),e}function f(c,d,e){var f=b.defer();return a.consultarRegistrosProximos(c,d,e).then(function(a){var b=g(a);f.resolve(h(b))}),f.promise}function g(a){var b=[];return angular.forEach(a.data.rows,function(c){var d={};angular.forEach(c,function(b,c){d[a.data.columns[c]]=b}),b.push(d)}),b}function h(a){var b=[];return angular.forEach(a,function(a){b.push(new c(a))}),b}var i={proximas:f,consultar:d,mostrar:!1};return i}angular.module("delegacias-fortaleza").service("Delegacias",a),a.$inject=["FusionTables","$q","Delegacia"]}(),function(){"use strict";angular.module("delegacias-fortaleza.busca",[])}(),function(){"use strict";function a(a,b,c,d){function e(c){b.mostrar=!0;var e="/mapa?lat="+c.lat+"&lon="+c.lon;a.delegacia=c,d.redirect(e)}function f(a,b){j.filtro.coodenadas={lat:a,lon:b}}function g(){a.showLoader=!0;var c=j.filtro.descricao,d="Todas"===j.filtro.categoria?void 0:j.filtro.categoria,e=j.filtro.coodenadas,f=void 0==e?void 0:j.filtro.distancia;b.consultar(c,d,e,f).then(function(b){j.delegacias=b,a.showLoader=!1})}function h(){var a=[],b=["Todas","Distrital","Especializada","Metropolitana","Municipal","Plantonista","Regional"];return angular.forEach(b,function(b){a.push({desc:b,value:b})}),a}function i(){for(var a=[],b=1;10>=b;b++)a.push({desc:b+" KM",value:1e3*b});return a}var j=this;j.categorias=h(),j.distancias=i(),j.pesquisar=g,j.verNoMapa=e,j.setCoodenadasFiltro=f,j.filtro={distancia:5e3,categoria:"Todas"}}angular.module("delegacias-fortaleza.busca").controller("Busca",a),a.$inject=["$rootScope","Delegacias","mapaHelper","routeHelper"]}(),function(){"use strict";function a(a){a.addRoutes(b())}function b(){return[{url:"/busca",config:{templateUrl:"delegacias-fortaleza/busca/busca.html",controller:"Busca",controllerAs:"busca",title:"Busca Detalhada",config:{posicao:2}}}]}angular.module("delegacias-fortaleza.busca").run(a),a.$inject=["routeHelper"]}(),function(){"use strict";angular.module("delegacias-fortaleza.sobre",[])}(),function(){"use strict";function a(){function a(){var a=[];return a.push({nome:"Julio Sampaio",github:"https://github.com/juliosampaio/",contribuicao:"Autor",avatar:"http://www.gravatar.com/avatar/ba578096028e7ec979bb1720693fd6de.png"}),a}var b=this;b.colaboradores=a()}angular.module("delegacias-fortaleza.sobre").controller("Sobre",a)}(),function(){"use strict";function a(a){a.addRoutes(b())}function b(){return[{url:"/sobre",config:{templateUrl:"delegacias-fortaleza/sobre/sobre.html",controller:"Sobre",controllerAs:"sobre",title:"Sobre",config:{posicao:3}}}]}angular.module("delegacias-fortaleza.sobre").run(a),a.$inject=["routeHelper"]}(),function(){"use strict";angular.module("meumapa.openstreetmap",[])}(),function(){"use strict";function a(a){a.setInicializarMapa(b)}function b(a,b,c){new ol.Map({target:c,layers:[new ol.layer.Tile({source:new ol.source.MapQuest({layer:"sat"})})],view:new ol.View({center:ol.proj.transform([b,a],"EPSG:4326","EPSG:3857"),zoom:11})})}angular.module("meumapa.openstreetmap").config(a),a.$inject=["mapaHelperConfigProvider"]}();