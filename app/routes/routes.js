app.config(function ($stateProvider, $urlRouterProvider) {
	
	//Por ahora no se utilizan. Se ha utilizado 'ng-include' en 'index.html' para cargar las paginas (views) en sus respectivos contenedores
	
	$stateProvider

/*
	.state('menu',{
	    views: {
		    'inicio': {
		    	url: "/inicio",
		    	templateUrl: 'app/views/menu/inicio.html',
		        controller: "inicioCtrl"
		    },
		    'opciones': {
		    	url: "/opciones",
		    	templateUrl: 'app/views/menu/opciones.html',
		        controller: "opcionesCtrl"
		    },
		    'recursos': {
		    	url: "/recursos",
		    	templateUrl: 'app/views/menu/recursos.html',
		        controller: "recursosCtrl"
		    },
		    'configuracion': {
		    	url: "/configuracion",
		    	templateUrl: 'app/views/menu/configuracion.html',
		        controller: "configuracionCtrl"
		    },
		    'informacion': {
		    	url: "/informacion",
		    	templateUrl: 'app/views/menu/informacion.html',
		        controller: "informacionCtrl"
		    }
	    }
	})
*/


/*
		.state({	
		 	name: "inicio",	
		 	url: "/inicio",	
		 	templateUrl: "app/views/menu/inicio.html",
		 	controller: "inicioCtrl"
	 	})

	 	.state({	
		 	name: "opciones",
		 	url: "/opciones",		
		 	templateUrl: "app/views/menu/opciones.html",
		 	controller: "opcionesCtrl"
	 	})	

	 	.state({	
		 	name: "recursos",	
		 	url: "/recursos",	
		 	templateUrl: "app/views/menu/recursos.html",
		 	controller: "recursosCtrl"
	 	})	

	 	.state({	
		 	name: "configuracion",	
		 	url: "/configuracion",	
		 	templateUrl: "app/views/menu/configuracion.html",
		 	controller: "configuracionCtrl"
	 	})	

	 	.state({	
		 	name: "informacion",	
		 	url: "/informacion",	
		 	templateUrl: "app/views/menu/informacion.html",
		 	controller: "informacionCtrl"
	 	})		

	 	
		$urlRouterProvider.otherwise("/inicio");

*/		

});