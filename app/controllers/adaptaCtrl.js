var adaptaCtrl = app.controller('adaptaCtrl',function ($scope, $compile, $state, adaptaService) {

    $scope.metodo = "l";

    //DRAG & DROP IMAGENES
    $( function() {
 
    // There's the gallery and the trash
    //var $gallery = $("#gallery");
    var $trash = $("#trash");
 
    // Let the gallery items be draggable
    $(".contenedor-imagen").draggable({
      cancel: "a.glyphicon", // clicking an icon won't initiate dragging
      revert: "invalid", // when not dropped, the item will revert back to its initial position
      containment: "document",
      helper: "clone",
      cursor: "move"
    });
 
    // Let the trash be droppable, accepting the gallery items
    $trash.droppable({
      accept: ".contenedor-imagen",
      drop: function( event, ui ) {
        deleteImage( ui.draggable );
      }
    });
 
    // Image deletion function
    var trash_icon = "<a href='link/to/trash/script/when/we/have/js/off' title='Eliminar' class='glyphicon glyphicon-trash'></a>";
    function deleteImage( $item ) {
        //$item = $item.clone();
      $item.fadeOut(function() {
        var $list = $( $trash ).length ?
          $( $trash ) :
          $( "<ul class='ui-helper-reset'/>" ).appendTo( $trash );
 
        $item.find( "a.glyphicon-plus" ).remove();
        $item.append( trash_icon ).appendTo( $list ).fadeIn(function() {
          $item
            .animate({ width: "72px", height: "80px" })
            .find( "img" )
              .animate({ height: "60px" });
        });
      });
    }
 
    function recycleImage( $item ) {
      $item.fadeOut(function() {
        $item
          .find( "a.glyphicon-trash" )
            .remove()
            /*
          .end()
          .css( "width", "72px")
          .append( trash_icon )
          .find( "img" )
            .css( "height", "72px" )
          .end()
          .appendTo( $gallery )
          .fadeIn();
          */
      });
    }
 
    // Image preview function, demonstrating the ui.dialog used as a modal window
    function viewLargerImage( $link ) {
        alert(JSON.stringify($link));
      var src = $link.attr( "href" ),
        title = $link.siblings( "img" ).attr( "alt" ),
        $modal = $( "img[src$='" + src + "']" );
 
      if ( $modal.length ) {
        $modal.dialog( "open" );
      } else {
        var img = $( "<img alt='" + title + "' width='300' height='300' style='display: none; padding: 8px;' />" )
          .attr( "src", src ).appendTo( "body" );
        setTimeout(function() {
          img.dialog({
            title: title,
            width: 400,
            modal: true
          });
        }, 1 );
      }
    }
 
    // Resolve the icons behavior with event delegation
    $( ".contenedor-imagen" ).on( "click", function( event ) {
      var $item = $( this ),
        $target = $( event.target );
 
      if ( $target.is( "a.glyphicon-plus" ) ) {
        deleteImage( $item );
      } else if ( $target.is( "a.glyphicon-zoom-in" ) ) {
        viewLargerImage( $target );
      } else if ( $target.is( "a.glyphicon-trash" ) ) {
        recycleImage( $item );
      }
 
      return false;
    });
  } );


















    //TOOLTIP

    $(function() {
        $(".container").draggable();
    });




    $(document).ready(function () {



  var nbP = $('.container .panel-container').length;
  var w = parseInt($('.container .panel-container').css("width"));
  var max = (nbP - 1) * w;
  $("ul li[data-num='1']").addClass('active');
  $('.step span').html('Step 1');
  
  $('body').on('click','.btn', function(){
    var margL = parseInt($('.slider-turn').css('margin-left'));
    var modulo = margL%w;
    if (-margL < max && modulo == 0) {
      margL -= w;
   
      $('.slider-turn').animate({
        'margin-left':margL
      },300);
      $('ul li.active').addClass('true').removeClass('active');
      var x = -margL/w +1;
      $('ul li[data-num="'+x+'"]').addClass('active');
      $('.step span').html("Step "+x);
    }
    else  {}
  });
  
  $('body').on('click','.close',function(){
    $('.container').animate({
      'opacity':0
    },600);
    $('.container').animate({
      'top':-1200
    }, {
      duration: 1000,
      queue: false
    });
    /*
    $('.open').animate({
      'top':'50%'
    });
    */
  });
  
  $('body').on('click','.open',function() {
    /*
    $('.open').animate({
      'top':-1000
    });
    */
    $('.container').animate({
      'opacity':1
    },400);
    $('.container').animate({
      'top':'50%'
    }, {
      duration: 800,
      queue: false
    });
  });
});

















    $(window).on("load resize ", function() {
      var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
      $('.tbl-header').css({'padding-right':scrollWidth});
    }).resize();






//MENU
    
    //Estado inicial de cada item del menu
    $(document).ready(function() {
        $('#menu-adapta').addClass('identificador-menu-activo menu-activo');
        $('#chincheta-adapta').addClass('chincheta-activa');
        $('#menu-opciones').addClass('identificador-menu-inactivo menu-inactivo');
        $('#menu-recursos').addClass('identificador-menu-inactivo menu-inactivo');
        $('#menu-configuracion').addClass('identificador-menu-inactivo menu-inactivo');
        $('#menu-informacion').addClass('identificador-menu-inactivo menu-inactivo');
    });

    //Se coloca la chincheta (se hace fijo el item) o se quita al pulsar en un item del menu
    $(document).on('click', '.chincheta', function() {

        if($(this).hasClass('chincheta-activa')) {

            $(this).removeClass('chincheta-activa');
            $('.menu-activo').removeClass('menu-activo');
            $('.identificador-menu-activo').removeClass('identificador-menu-activo');

            $('.menu-inactivo').removeClass('menu-inactivo');
            $('.identificador-menu-inactivo').removeClass('identificador-menu-inactivo');
        }

        else {

            $('.chincheta-activa').removeClass('chincheta-activa');
            $('.menu-activo').removeClass('menu-activo');
            $('.identificador-menu-activo').addClass('identificador-menu-inactivo menu-inactivo');
            $('.identificador-menu-activo').removeClass('identificador-menu-activo');

            $('.item-menu').addClass('identificador-menu-inactivo menu-inactivo');


            var elemento = $(this).parent().parent().parent().get(0);

            $(this).addClass('chincheta-activa');
            $(elemento).removeClass('identificador-menu-inactivo menu-inactivo');
            $(elemento).addClass('identificador-menu-activo menu-activo');
            
        }

    });

    //Se visualiza
    $(document).on({
        mouseenter: function () {
            $('.identificador-menu-activo').removeClass('menu-activo');
            $('.identificador-menu-activo').addClass('menu-inactivo');
            $(this).removeClass('menu-inactivo');
            $(this).addClass('menu-activo');
        },

        mouseleave: function () {
            $('.identificador-menu-activo').removeClass('menu-inactivo');
            $('.identificador-menu-activo').addClass('menu-activo');
            $(this).removeClass('menu-activo');
            $(this).addClass('menu-inactivo');
        }
    }, '.identificador-menu-inactivo');








    //Boton switch on/off
    $('.toggle').click(function(e){
      e.preventDefault(); // The flicker is a codepen thing
      $(this).toggleClass('toggle-on');
    });




    $(function() { 
        $('.contenedor-froala').froalaEditor({
            language: 'es',
            theme: 'custom',
            height: 180,
            //toolbarButtons: ['bold', 'italic', 'underline']
            toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'color', 'paragraphStyle', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', 'insertHR', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 'undo', 'redo', 'clearFormatting']
        }) 
    });


    //Boton PROCESAR
    var upInteractive = false;

    function autoToggle() {
      $('.arrow').toggleClass('auto');
    }

    $('.arrow').hover(function() {
      upInteractive = true;
      $('.arrow').removeClass('auto');
    });

    setInterval(function(){ 
      
      //console.log(upInteractive);
      
      if(upInteractive === false) {
        autoToggle();
      }

    },3000);



    $('#original').on('froalaEditor.contentChanged', function (e, editor) {

      var min = $scope.minTexto();

      if(min == true) {
        $scope.habilitaProcesamiento();
        $scope.habilitaDescargas();
      }

      else {
        $scope.deshabilitaProcesamiento();
        $scope.deshabilitaDescargas();
      }

    });


    $scope.minTexto = function() {

      var txt = $('#original').froalaEditor('html.get');
      var caracteres = txt.length;

      var min = true;


      if(caracteres >= 17) {
        min = true;
      }

      else {
        min = false;
      }

      return min;

    };



    $( ".icono-fichero" ).on( "click", function(e) {
      e.preventDefault();

    });


    $scope.setMetodo = function() {

      //adaptaService.setProcesamiento($scope.metodo);

    };

    $scope.habilitaProcesamiento = function() {

      if($scope.minTexto()){
        $('#procesar').removeClass('procesar-deshabilitado');
      }

    };

    $scope.deshabilitaProcesamiento = function() {

      $('#procesar').addClass('procesar-deshabilitado');

    };

    $scope.habilitaDescargas = function() {

      if($scope.minTexto()){
        $('#guardar').removeClass('procesar-deshabilitado');
        $('#descargar').removeClass('procesar-deshabilitado');
        $('#compartir').removeClass('procesar-deshabilitado');
      }

    };

    $scope.deshabilitaDescargas = function() {

      $('#guardar').addClass('procesar-deshabilitado');
      $('#descargar').addClass('procesar-deshabilitado');
      $('#compartir').addClass('procesar-deshabilitado');

    };


    $scope.cargar = function(element) {

    	var fichero = element.files[0];

        var reader = new FileReader();
     
        reader.onload = function () {

            //Asi se muestra el fichero entero leido:
            //$scope.original = reader.result;
            //$scope.$apply();
            $('#original').froalaEditor('html.set', reader.result);
            $('#original').froalaEditor('undo.saveStep');

        };

        reader.readAsText(fichero); 

    };



    $scope.procesar = function() {


        if(!$('#procesar').hasClass('procesar-deshabilitado')) {

            $('#procesar').addClass('invisible');
            $('#loading').removeClass('invisible');
            $('#loading').removeClass('oculto');

            
            var txt = $('#original').froalaEditor('html.get');
            var contenido = "";
            var procesado = "";

            var palabras = "";
            
            //var metodo = adaptaService.getProcesamiento();
            var url = "";
            
            $.ajax({
                type: "POST",
                url: "http://gplsi.dlsi.ua.es:80/services/pln/rest/v1/gplsi/compendium/"+$scope.metodo+"/1",
                async: false,
                contentType: "text/plain",
                data: txt,
                success: function(data, status) {
                    contenido = data;
                },
                error: function(result) {
                    alert("ERROR: "+ JSON.stringify(result))
                }
            });

            palabras = contenido.split(' ');

            for(var i=0; i<palabras.length; i++) {

              procesado += "<span class='open'>"+palabras[i]+" </span>";
            }
            


            $('#procesado').froalaEditor('html.set', procesado);
            $('#procesado').froalaEditor('undo.saveStep');

            $('#procesar').addClass('procesar-deshabilitado');
            $('#procesar').removeClass('invisible');
            $('#loading').addClass('invisible');
            $('#loading').addClass('oculto');

        }

    };




    $scope.imagenPalabra = function(palabra) {

        $.ajax({
            type: "GET",
            url: "https://babelnet.io/v4/getSynsetIds?word="+palabra+"&langs=ES&key=135619a2-dd54-4581-a93f-67f93ad66f1d",
            async: false,
            //data: {id:'bn:14792761n',key:'135619a2-dd54-4581-a93f-67f93ad66f1d'},
            success: function(data, status) {
                console.log(data[1].id);
                id_palabra.setPalabraId(data[1].id);
            },

            error: function(result) {
                console.log("ERROR: "+result);
            }
        });

        var id_palabra_aux = id_palabra.getPalabraId();

        $.ajax({
            type: "GET",
            url: "https://babelnet.io/v4/getSynset?id="+id_palabra_aux+"&key=135619a2-dd54-4581-a93f-67f93ad66f1d",
            //data: {id:'bn:14792761n',key:'135619a2-dd54-4581-a93f-67f93ad66f1d'},
            success: function(data, status) {
                //console.log("FUNCIONA: "+data.lemma+", .... ,"+data.pos);
                //console.log(JSON.stringify(data));

                $.each(data['images'], function(key, val) {

                    var key = key;



                    //var entry = "Language: " + val['language'] + "<br/>Name: "
                        //+ val['name'] + "<br/>Url: " + val['url'] + "<br/><br/>";

                    //$('<div>', {html:entry}).appendTo(document.body);
                    //var preimagen = "<img ng-src='"+val['url']+"'>";
                    //var imagen = $compile(preimagen);
                    $scope.procesado += "<img ng-src='"+val['url']+"'>";
                    //$compile($scope.procesado);
                    //$scope.$apply();
                });

                
                $.each(data['glosses'], function(key, val) {
                    $scope.procesado += " ---- Gloss: " + val['gloss'];
                    //$scope.$apply();
                });


                //LEMA -> NO INTERESA
                /*
                $.each(data['senses'], function(key, val) {
                    $scope.procesado += " ---- Lemma: " + val['lemma'];
                    $scope.$apply();
                });
                */
                
            },

            error: function(result) {
                console.log("ERROR: "+result);
            }
        });

    };


    var id_palabra = (function(){

        var palabra_id = "";

        return {
            getPalabraId: function(){
                return palabra_id;
            },
            setPalabraId: function(idp){
                palabra_id = idp;
            }
        }
        
    }());

});






$(document).on('click', '.icono-descarga', function() {

  if($(this).hasClass('icono-descarga-activo')) {

    $(this).removeClass('icono-descarga-activo');
  }

  else {

    $(this).addClass('icono-descarga-activo');
  }

});


$(document).on('click', '.icono-redsocial', function() {

  	window.open(this.href, 'mywin','left=20,top=20,width=500,height=500,toolbar=1,resizable=0');
	event.preventDefault();

});

