var procesamiento = app.service('adaptaService',function(){

	procesamiento.opcion = "";

	this.setProcesamiento = function(opcion) {

		procesamiento.opcion = opcion;
	}

	this.getProcesamiento = function() {

		return procesamiento.opcion;
	}
	
});