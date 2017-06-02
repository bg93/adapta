var adaptaCtrl = app.controller('adaptaCtrl', function ($scope, $compile, $state, $http, adaptaService) {




    // $(".dynacloud").dynaCloud();

    //EDITORES
    CKEDITOR.replace('original');
    CKEDITOR.replace('procesado');

    // -------------------------------------------------------------------------

    //BOTÓN DE CARGA DE FICHERO
    $(".icono-fichero").on("click", function (e) {
        e.preventDefault();
    });

    // -------------------------------------------------------------------------

    //CARGA DE FICHERO
    $scope.cargar = function (element) {

        //Se lee el fichero

        var fichero = element.files[0];

        var reader = new FileReader();

        reader.onload = function () {

            //Se inserta el contenido del fichero en el editor original
            CKEDITOR.instances.original.setData(reader.result);

        };

        reader.readAsText(fichero);

    };

    // -------------------------------------------------------------------------

    //BOTÓN DE PROCESAMIENTO
    var upInteractive = false;

    function autoToggle() {
        $('.arrow').toggleClass('auto');
    }

    $('.arrow').hover(function () {
        upInteractive = true;
        $('.arrow').removeClass('auto');
    });

    setInterval(function () {

        //console.log(upInteractive);

        if (upInteractive === false) {
            autoToggle();
        }

    }, 3000);

    // -------------------------------------------------------------------------

    //DETECCIÓN DE CAMBIOS EN EL EDITOR ORIGINAL
    CKEDITOR.instances.original.on('change', function () {

        var min = $scope.minTexto();

        if (min == true) {
            $scope.habilitaProcesamiento();
            $scope.habilitaDescargas();
        } else {
            $scope.deshabilitaProcesamiento();
            $scope.deshabilitaDescargas();
        }

    });

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

    //DESACTIVACIÓN DEL BOTÓN DE PROCESAMIENTO
    $scope.deshabilitaProcesamiento = function () {

        $('#procesar').addClass('procesar-deshabilitado');

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

    //DESACTIVACIÓN DE LOS BOTONES DE GUARDAR, DESCARGAR Y COMPARTIR
    $scope.deshabilitaDescargas = function () {

        $('#guardar').addClass('procesar-deshabilitado');
        $('#descargar').addClass('procesar-deshabilitado');
        $('#compartir').addClass('procesar-deshabilitado');
        $('#imprimir').addClass('procesar-deshabilitado');

    };

    // -------------------------------------------------------------------------

    //REALIZACIÓN DEL PROCESAMIENTO
    $scope.procesar = function () {

        if (!$('#procesar').hasClass('procesar-deshabilitado')) {

            $('#procesar').addClass('invisible');
            $('#loading').removeClass('invisible');
            $('#loading').removeClass('oculto');


            var contenido = CKEDITOR.instances.original.getData();
            var procesado = CKEDITOR.instances.original.getData();

            var opcion1 = adaptaService.getOpcion1Procesamiento();
            var ratio1 = adaptaService.getRatio1Procesamiento();
            ratio1 = (100 - (ratio1 - 1));

            var opcion2 = adaptaService.getOpcion2Procesamiento();

            var opcion3 = adaptaService.getOpcion3Procesamiento();


            var palabras = "";

            var lenguaje = "";

            $.ajax({
                type: "POST",
                url: "http://gplsi.dlsi.ua.es:80/services/pln/rest/v1/lang/detect",
                async: false,
                contentType: "text/plain",
                data: contenido,
                success: function (response, status) {
                    lenguaje = response;
                },
                error: function (response) {
                    alert("Ha ocurrido un error: " + JSON.stringify(response))
                }
            });


            //LENGUAJE: INGLÉS
            if (lenguaje == "en") {

                //OPCIÓN 1: RESUMEN
                // --- 0 -> Desactivado
                // --- 1 -> Activado

                if (opcion1 == "1") {

                    //RESUMEN Activado
                    $.ajax({
                        type: "POST",
                        url: "http://gplsi.dlsi.ua.es:80/services/pln/rest/v1/gplsi/compendium/n/" + ratio1,
                        async: false,
                        contentType: "text/plain",
                        data: contenido,
                        success: function (response, status) {
                            procesado = response;
                            //CKEDITOR.instances.procesado.setData(response);
                        },
                        error: function (response) {
                            alert("Ha ocurrido un error: " + JSON.stringify(response))
                        }
                    });

                }

                //OPCIÓN 2: VISUALIZACION
                // --- 1 -> Textual
                // --- 2 -> Visual
                // --- 3 -> Nube
                // --- 4 -> Esquema

                if (opcion2 == "1") {
                    //VISUALIZACION Textual
                    //No es necesario realizar nada, puesto que la visualización por defecto es textual (obtenida del texto original)
                } else if (opcion2 == "2") {
                    //VISUALIZACION Visual
                } else if (opcion2 == "3") {
                    //VISUALIZACION Nube

                    //var separadores = ['.',',',':',';','¿','?','¡','!','"','/','|','(',')','=','·',' ','  '];
                    //var procesado_nube = procesado.split (new RegExp (separadores.join('|'),'g'));
                    var procesado_nube = procesado.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/);
                    //alert(procesado_nube);

                    var freqMap = {};
                    procesado_nube.forEach(function (w) {
                        if (!freqMap[w]) {
                            freqMap[w] = 0;
                        }
                        freqMap[w] += 1;
                    });


                    //alert(JSON.stringify(freqMap));

                    //alert(freqMap["at"]);








                    var sortedWords = procesado_nube.sort();
                    var uniqueWords = [];
                    var d = {};
                    var wordcount = 1;
                    var result = [];
                    var numofwords = sortedWords.length;

                    for (var i = 0; i < sortedWords.length; i++) {

                        var currentword = sortedWords[i];

                        if (sortedWords[i + 1] === currentword) {
                            wordcount++;
                        }

                        if (!d[currentword]) {
                            d[currentword] = true;
                            uniqueWords.push({
                                word: currentword,
                                count: wordcount
                            });
                        }
                    }

                    uniqueWords = uniqueWords.slice(0, numofwords).sort(function (a, b) {
                        return b.count - a.count;
                    });

                    for (i = 0; i < uniqueWords.length; i++) {

                        result.push(uniqueWords[i].word);
                    }

                    alert(result.toString());







                } else if (opcion2 == "4") {
                    //VISUALIZACION Esquema
                }


                //OPCIÓN 3: ...
                if (opcion3 == "1") {

                }

                //Despues de realizar todo el procesamiento sobre el texto original, se escribe el texto procesado en su textarea
                CKEDITOR.instances.procesado.setData(procesado);

            }

            //LENGUAJE: CUALQUIER OTRO
            else {
                CKEDITOR.instances.procesado.setData("El texto introducido está en un idioma que no es compatible con la aplicación. Actualmente, ADAPT@ solo puede procesar textos en inglés.");
            }

            /*
            var prueba = "buenas tardes";
            $http.post(

                "http://gplsi.dlsi.ua.es:80/services/pln/rest/v1/lang/detect", {body:prueba}

            ).then(function (response) {

                alert("exito -> " + response);

            }, function (response) {

                alert("error -> " + response);
                alert(JSON.stringify(response));
            });

            */


            /*
                        $http({
                                url: 'http://gplsi.dlsi.ua.es:80/services/pln/rest/v1/lang/detect',
                                method: "POST",
                                data: '{"body": "hola buenos dias"}'
                            })
                            .then(function (response) {
                                    alert("correcto: " + response);
                                    alert(JSON.stringify(response));
                                },
                                function (response) {
                                    alert("incorrecto: " + response);
                                    alert(JSON.stringify(response));
                                });
            */



            /*
                        $http.post(

                            "http://gplsi.dlsi.ua.es:80/services/pln/rest/v1/lang/detect", "buenas tardes"

                        ).then(function (response) {

                            alert("exito -> " + response);

                        }, function (response) {

                            alert("error -> " + response);
                            alert(JSON.stringify(response));
                        });
                        */

            /*
                        $.ajax({
                            type: "POST",
                            url: "http://gplsi.dlsi.ua.es:80/services/pln/rest/v1/gplsi/compendium/" + $scope.metodo + "/1",
                            async: false,
                            contentType: "text/plain",
                            data: txt,
                            success: function (data, status) {
                                contenido = data;
                            },
                            error: function (result) {
                                alert("ERROR: " + JSON.stringify(result))
                            }
                        });

                        palabras = contenido.split(' ');

                        for (var i = 0; i < palabras.length; i++) {

                            procesado += "<span class='open'>" + palabras[i] + " </span>";
                        }
            */

            //CKEDITOR.instances.procesado.setData(procesado);


            $('#procesar').addClass('procesar-deshabilitado');
            $('#procesar').removeClass('invisible');
            $('#loading').addClass('invisible');
            $('#loading').addClass('oculto');

        }


        $scope.deshabilitaProcesamiento();

    };





    // -------------------------------------------------------------------------

    // Imprimir documento
    $('#imprimir').on('click', function () {

        var texto_original = CKEDITOR.instances.original.document.getBody().getHtml();
        var texto_procesado = CKEDITOR.instances.procesado.document.getBody().getHtml();

        $("#documento_imprimir_original").html(texto_original);

        var nombre_original = "original";
        var nombre_procesado = "procesado";

        //$.print("#documento_imprimir_original");

        //$("#documento_imprimir_original").print();



        var doc = window.open('', 'PRINT', 'height=400,width=600');

        doc.document.write('<html><head><title>' + document.title + '</title>');
        doc.document.write('</head><body >');
        doc.document.write($("#documento_imprimir_original").html());
        doc.document.write('</body></html>');

        doc.document.close();
        doc.focus();

        doc.print();
        doc.close();


    });


    // -------------------------------------------------------------------------


    $scope.imagenPalabra = function (palabra) {

        $.ajax({
            type: "GET",
            url: "https://babelnet.io/v4/getSynsetIds?word=" + palabra + "&langs=ES&key=135619a2-dd54-4581-a93f-67f93ad66f1d",
            async: false,
            //data: {id:'bn:14792761n',key:'135619a2-dd54-4581-a93f-67f93ad66f1d'},
            success: function (data, status) {
                console.log(data[1].id);
                id_palabra.setPalabraId(data[1].id);
            },

            error: function (result) {
                console.log("ERROR: " + result);
            }
        });

        var id_palabra_aux = id_palabra.getPalabraId();

        $.ajax({
            type: "GET",
            url: "https://babelnet.io/v4/getSynset?id=" + id_palabra_aux + "&key=135619a2-dd54-4581-a93f-67f93ad66f1d",
            //data: {id:'bn:14792761n',key:'135619a2-dd54-4581-a93f-67f93ad66f1d'},
            success: function (data, status) {
                //console.log("FUNCIONA: "+data.lemma+", .... ,"+data.pos);
                //console.log(JSON.stringify(data));

                $.each(data['images'], function (key, val) {

                    var key = key;



                    //var entry = "Language: " + val['language'] + "<br/>Name: "
                    //+ val['name'] + "<br/>Url: " + val['url'] + "<br/><br/>";

                    //$('<div>', {html:entry}).appendTo(document.body);
                    //var preimagen = "<img ng-src='"+val['url']+"'>";
                    //var imagen = $compile(preimagen);
                    $scope.procesado += "<img ng-src='" + val['url'] + "'>";
                    //$compile($scope.procesado);
                    //$scope.$apply();
                });


                $.each(data['glosses'], function (key, val) {
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

            error: function (result) {
                console.log("ERROR: " + result);
            }
        });

    };


});
