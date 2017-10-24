(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .controller("registerController", RegisterController);

    function RegisterController($rootScope, $location, UserService) {

        var vm = this;

        function init() {
            vm.register = register;

            removeErrorVariables();

        }

        init();

        function removeErrorVariables() {
            if (vm.useremailerror) {
                delete vm.useremailerror;
            }
            if (vm.useremailerror) {
                delete vm.useremailerror;
            }
            if (vm.userpasserror) {
                delete vm.userpasserror;
            }
            if (vm.verifyuserpasserror) {
                delete vm.verifyuserpasserror;
            }
            if (vm.passwordsdontmatcherror) {
                delete vm.passwordsdontmatcherror;
            }
        }

        function verifyUserDetails(user) {
            var flag = 1;

            if (!user.useremail) {
                vm.useremailerror = "Please enter an email";
                flag = 0;
            } else {
                delete vm.useremailerror;
            }

            if (!user.username) {
                vm.usernameerror = "Please enter username";
                flag = 0;
            } else {
                delete vm.usernameerror;
            }

            if (!user.userpass) {
                vm.userpasserror = "Please enter password";
                flag = 0;
            } else {
                delete vm.userpasserror;
            }

            if (!user.verifyuserpass) {
                vm.verifyuserpasserror = "Please re-enter password";
                flag = 0;
            } else {
                delete vm.verifyuserpasserror;
            }

            if (user.userpass && user.verifyuserpass) {
                if (user.userpass != user.verifyuserpass) {
                    vm.passwordsdontmatcherror = "Passwords dont match";
                    flag = 0;
                } else {
                    delete vm.passwordsdontmatcherror;
                }
            }

            return flag;

        }

        function register(user) {


            if (verifyUserDetails(user) != 1) {
                return;
            }


            var userBasicInfo = {
                username: user.username,
                password: user.userpass,
                email: user.useremail,
                roles: ['normal'],
                likes: [],
                comments: [],
                follows: []
            };

            //console.log(userBasicInfo);

            UserService
                //.createUser(userBasicInfo)
                .register(userBasicInfo)
                .then(function (response) {
                    $rootScope.newUser = response.data;
                    //console.log(response.data);
                    $location.url("/profile");
                });


        }


    }
})();