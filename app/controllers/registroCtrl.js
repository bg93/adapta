var registroCtrl = app.controller('registroCtrl', function ($scope, $compile, $state, $http, adaptaService) {

    $scope.registro = function () {

        $http({

            method: 'POST',
            url: 'app/php/autenticacion/registro.php',
            data: {
                registro_usuario: $scope.registro_usuario,
                registro_email: $scope.registro_email,
                registro_password: $scope.registro_password
            }

        }).then(function (data) {

            //Success

            //$scope.getPeople();

            alert(data);
            //alert(JSON.stringify(response));

        }, function (response) {

            //Error

            //console.log(response.data, response.status);

            alert("error");

        });
    };

});
