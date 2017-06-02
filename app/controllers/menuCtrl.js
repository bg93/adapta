var menuCtrl = app.controller('menuCtrl', function ($scope, $compile, $state, adaptaService) {

  //MENU

  //Estado inicial de cada item del menu
  $(document).ready(function () {
    $('#menu-adapta').addClass('identificador-menu-activo menu-activo');
    $('#chincheta-adapta').addClass('chincheta-activa');
    $('#menu-opciones').addClass('identificador-menu-inactivo menu-inactivo');
    $('#menu-recursos').addClass('identificador-menu-inactivo menu-inactivo');
    $('#menu-configuracion').addClass('identificador-menu-inactivo menu-inactivo');
    $('#menu-informacion').addClass('identificador-menu-inactivo menu-inactivo');
  });

  //Se coloca la chincheta (se hace fijo el item) o se quita al pulsar en un item del menu
  $(document).on('click', '.chincheta', function () {

    if ($(this).hasClass('chincheta-activa')) {

      $(this).removeClass('chincheta-activa');
      $('.menu-activo').removeClass('menu-activo');
      $('.identificador-menu-activo').removeClass('identificador-menu-activo');

      $('.menu-inactivo').removeClass('menu-inactivo');
      $('.identificador-menu-inactivo').removeClass('identificador-menu-inactivo');
    } else {

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



});
