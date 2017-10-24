(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .controller("loginController", LoginController);

    function LoginController($scope, $location, $rootScope, UserService) {
        var vm = this;

        function init() {
            vm.login = login;
        }

        init();

        function login(user) {
            var loggedUser;
            UserService
                //.findUserByCredentials(
                //    user.username,
                //    user.password
                //)
                .login(user)
                .then(function (response) {
                    loggedUser = response.data;
                    //console.log(loggedUser);
                    $rootScope.newUser = loggedUser;

                    if ($rootScope.newUser)
                        $location.url("/search");
                    else {
                        vm.error = "Invalid username or password";
                    }

                });

        }

    }
})();