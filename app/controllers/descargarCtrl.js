var descargarCtrl = app.controller('descargarCtrl', function ($scope, $compile, $state, $http, adaptaService) {

  // -------------------------------------------------------------------------

  // Icono de descarga seleccionado
  $('.icono-fichero').on('click', function () {

    if($(this).hasClass("icono-fichero-activo")) {
      $(this).removeClass("icono-fichero-activo");
    }

    else{
      $(this).addClass("icono-fichero-activo");
    }

  });

  // -------------------------------------------------------------------------


  // Descargar PDF
  $('#descargar-pdf').on('click', function () {

    var texto_original = CKEDITOR.instances.original.document.getBody().getHtml();
    var texto_procesado = CKEDITOR.instances.procesado.document.getBody().getHtml();

    var doc = new jsPDF();

    var specialElementHandlers = {
      //El elemento '#editor' no esta. Si esta parte diese problemas se podria crear un:
      //<div id="editor"></div>
      //cerca de los 2 editores CKEditor
      '#editor': function (element, renderer) {
        return true;
      }
    };

    doc.fromHTML(texto_original, 15, 15, {
      'width': 170,
      'elementHandlers': specialElementHandlers
    });

    doc.save('a5.pdf');

  });

  // -------------------------------------------------------------------------

  // Descargar EPUB
  $('#descargar-epub').on('click', function () {



  });

  // -------------------------------------------------------------------------

  // Descargar DOC
  $('#descargar-doc').on('click', function () {

    var texto_original = CKEDITOR.instances.original.document.getBody().getHtml();
    var texto_procesado = CKEDITOR.instances.procesado.document.getBody().getHtml();

    $("#documento_doc_original").html(texto_original);
    $("#documento_doc_original").wordExport("nombreDOC");

  });

  // -------------------------------------------------------------------------

  // Descargar TXT
  $('#descargar-txt').on('click', function () {

    //var texto_original = CKEDITOR.instances.original.getData();
    //var texto_procesado = CKEDITOR.instances.procesado.getData();

    var texto_original = CKEDITOR.instances.original.document.getBody().getHtml();
    var texto_procesado = CKEDITOR.instances.procesado.document.getBody().getHtml();

    $("#documento_txt_original").html(texto_original);

    texto_original = $("#documento_txt_original").text();



    var nombre_original = "original";
    var nombre_procesado = "procesado";

    var blob_original = new Blob([texto_original], {
      type: "text/plain;charset=utf-8"
    });

    saveAs(blob_original, nombre_original + ".txt");


  });

  // -------------------------------------------------------------------------

  // Descargar XML
  $('#descargar-xml').on('click', function () {



  });

  // -------------------------------------------------------------------------

});
