var procesamiento = app.service('adaptaService',function(){

	//ESTADO OPCIÓN1:
	// 0 -> Desactivado
	// 1 -> Activado

	//VISUALIZACIÓN OPCIÓN2:
	// 1 -> Textual
	// 2 -> Visual
	// 3 -> Nube de palabras
	// 4 -> Esquema

	procesamiento.opcion1 = "";
	procesamiento.ratio1 = "";

	procesamiento.opcion2 = "";

	procesamiento.opcion3 = "";

	// -------------------------------------------------------------------------

	//ACTIVACIÓN/DESACTIVACIÓN DE LA OPCIÓN1 DE PROCESAMIENTO
	this.setOpcion1Procesamiento = function(num) {

		procesamiento.opcion1 = num;
	}

	// -------------------------------------------------------------------------

	//OBTENCIÓN DEL ESTADO DE LA OPCIÓN1 DE PROCESAMIENTO
	this.getOpcion1Procesamiento = function() {

		return procesamiento.opcion1;
	}


	// -------------------------------------------------------------------------

	//ACTIVACIÓN/DESACTIVACIÓN DE LA OPCIÓN2 DE PROCESAMIENTO
	this.setOpcion2Procesamiento = function(num) {

		procesamiento.opcion2 = num;
	}

	// -------------------------------------------------------------------------

	//OBTENCIÓN DEL ESTADO DE LA OPCIÓN2 DE PROCESAMIENTO
	this.getOpcion2Procesamiento = function() {

		return procesamiento.opcion2;
	}


	// -------------------------------------------------------------------------

	//ACTIVACIÓN/DESACTIVACIÓN DE LA OPCIÓN3 DE PROCESAMIENTO
	this.setOpcion3Procesamiento = function(num) {

		procesamiento.opcion3 = num;
	}

	// -------------------------------------------------------------------------

	//OBTENCIÓN DEL ESTADO DE LA OPCIÓN3 DE PROCESAMIENTO
	this.getOpcion3Procesamiento = function() {

		return procesamiento.opcion3;
	}




	// -------------------------------------------------------------------------

	//ASIGNACIÓN DEL RATIO DE LA OPCIÓN1 DE PROCESAMIENTO
	this.setRatio1Procesamiento = function(ratio) {

		procesamiento.ratio1 = ratio;
	}

	// -------------------------------------------------------------------------

	//OBTENCIÓN DEL RATIO DE LA OPCIÓN1 DE PROCESAMIENTO
	this.getRatio1Procesamiento = function() {

		return procesamiento.ratio1;
	}

	// -------------------------------------------------------------------------


});
