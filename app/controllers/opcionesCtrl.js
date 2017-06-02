var opcionesCtrl = app.controller('opcionesCtrl', function ($scope, $compile, $state, adaptaService) {


  //Boton switch on/off
  $('.toggle').click(function (e) {
    e.preventDefault(); // The flicker is a codepen thing
    $(this).toggleClass('toggle-on');
  });

  // -------------------------------------------------------------------------

  //SE INICIALIZAN LOS VALORES DE LAS OPCIONES Y RATIOS
  adaptaService.setOpcion1Procesamiento(1);
  adaptaService.setOpcion2Procesamiento(0);
  adaptaService.setOpcion3Procesamiento(0);

  adaptaService.setRatio1Procesamiento(50);


  // -------------------------------------------------------------------------

  //DETECCIÓN ACTIVACIÓN/DESACTIVACIÓN DE LA OPCIÓN DE RESUMEN
  $('#check_opcion1').on('click', function () {

    if ($(this).is(':checked')) {
      // Opción1 de procesamiento ACTIVADA
      adaptaService.setOpcion1Procesamiento(1);
      $("#range_opcion1").prop('disabled', false);
      //$scope.setOpcion1Procesamiento(1);

    } else {
      // Opción1 de procesamiento DESACTIVADA
      adaptaService.setOpcion1Procesamiento(0);
      $('#range_opcion1').prop('disabled', true);
      //$scope.setOpcion1Procesamiento(0);
    }

    $scope.habilitaProcesamiento();
    $scope.habilitaDescargas();

  });

  // -------------------------------------------------------------------------

  //DETECCIÓN DE LA OPCIÓN DE VISUALIZACIÓN
  $('.radio_opcion2').on('click', function () {

    var tipo_visualizacion = $(this).val();

    if(tipo_visualizacion == "textual") {
      adaptaService.setOpcion2Procesamiento(1);
    }

    else if(tipo_visualizacion == "visual") {
      adaptaService.setOpcion2Procesamiento(2);
    }

    else if(tipo_visualizacion == "nube") {
      adaptaService.setOpcion2Procesamiento(3);
    }

    else if(tipo_visualizacion == "esquema") {
      adaptaService.setOpcion2Procesamiento(4);
    }

    $scope.habilitaProcesamiento();
    $scope.habilitaDescargas();

  });

  // -------------------------------------------------------------------------

  //DETECCIÓN ACTIVACIÓN/DESACTIVACIÓN DE LA OPCIÓN3 DE PROCESAMIENTO
  $('#check_opcion3').on('click', function () {

    if ($(this).is(':checked')) {
      // Opción3 de procesamiento ACTIVADA
      adaptaService.setOpcion3Procesamiento(1);
      $("#range_opcion3").prop('disabled', false);

    } else {
      // Opción3 de procesamiento DESACTIVADA
      adaptaService.setOpcion3Procesamiento(0);
      $("#range_opcion3").prop('disabled', true);
    }

    $scope.habilitaProcesamiento();
    $scope.habilitaDescargas();

  });

  // -------------------------------------------------------------------------

  //DETECCIÓN RATIO DE LA OPCIÓN1 DE PROCESAMIENTO
  $("#range_opcion1").on("change", function () {
    // Asigna el ratio correspondiente a la Opción1
    adaptaService.setRatio1Procesamiento(this.value);

    $scope.habilitaProcesamiento();
    $scope.habilitaDescargas();

  });

  // -------------------------------------------------------------------------


  // -------------------------------------------------------------------------





  //COMPROBACIÓN DE TEXTO MÍNIMO INTRODUCIDO EN EL EDITOR ORIGINAL
  $scope.minTexto = function () {

    var txt = CKEDITOR.instances.original.getData();
    var caracteres = txt.length;

    var min = true;

    if (caracteres >= 17) {
      min = true;
    } else {
      min = false;
    }

    return min;

  };

  // -------------------------------------------------------------------------

  //ACTIVACIÓN DEL BOTÓN DE PROCESAMIENTO
  $scope.habilitaProcesamiento = function () {

    if ($scope.minTexto()) {
      $('#procesar').removeClass('procesar-deshabilitado');
    }

  };

  // -------------------------------------------------------------------------

  //ACTIVACIÓN DE LOS BOTONES DE GUARDAR, DESCARGAR Y COMPARTIR
  $scope.habilitaDescargas = function () {

    if ($scope.minTexto()) {
      $('#guardar').removeClass('procesar-deshabilitado');
      $('#descargar').removeClass('procesar-deshabilitado');
      $('#compartir').removeClass('procesar-deshabilitado');
      $('#imprimir').removeClass('procesar-deshabilitado');
    }

  };

  // -------------------------------------------------------------------------


});
