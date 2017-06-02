var loginCtrl = app.controller('loginCtrl', function ($scope, $compile, $state, $http, adaptaService) {

    $scope.login = function () {

        $http({

            method: 'GET',
            url: 'app/php/autenticacion/login.php'

        }).then(function (response) {

            //Success
            //$scope.people = response.data;

            alert("exito");

        }, function (response) {

            //Error
            //console.log(response.data, response.status);

            alert("error");

        });

    };

});
