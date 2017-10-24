(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .controller("HeaderController", HeaderController);

    function HeaderController($rootScope, $scope, UserService, $location) {
        $scope.logoutUser = logoutUser;

        function logoutUser() {
            //$rootScope.newUser = null;
            //if($rootScope.allUsers) {
            //    $rootScope.allUsers = null;
            //}

            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.newUser = null;
                        $location.url("/login");
                    },
                    function (err) {
                        $scope.error = err;
                    }
                );

        }
    }
})();