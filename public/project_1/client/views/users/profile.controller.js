(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .controller("profileController", ProfileController);

    function ProfileController($scope, $rootScope, UserService, $location) {

        var vm = this;

        function init() {
            vm.update = update;

            var newUser = $rootScope.newUser;

            //console.log(newUser);

            vm.username = newUser.username;
            vm.password = newUser.password;
            vm.email = newUser.email;
            vm.firstname = newUser.firstName;
            vm.lastname = newUser.lastName;

            if (vm.firstnameerror) {
                delete vm.firstnameerror;
            }
            if (vm.lastnameerror) {
                delete vm.lastnameerror;
            }

        }

        init();

        function verifyFirstLastName(user) {

            var flag = 1;

            if (!user.firstname) {
                vm.firstnameerror = "Please update first name";
                flag = 0;
            } else {
                delete vm.firstnameerror;
            }

            if (!user.lastname) {
                vm.lastnameerror = "Please update last name";
                flag = 0;
            } else {
                delete vm.lastnameerror;
            }

            return flag;
        }

        function update(user) {

            if (verifyFirstLastName(user) != 1)
                return;


            var updatedUser = {
                "_id": $rootScope.newUser._id,
                "username": user.username,
                "password": user.password,
                "email": user.email,
                "firstName": user.firstname,
                "lastName": user.lastname,
                "likes": $rootScope.newUser.likes,
                "comments": $rootScope.newUser.comments,
                "follows": $rootScope.newUser.follows,
                "roles": $rootScope.newUser.roles
            };


            UserService
                .updateUser(
                    updatedUser._id,
                    updatedUser
                )
                .then(function (response) {
                    $rootScope.newUser = response.data;
                    //console.log(response);
                    //console.log($rootScope.newUser);
                });

            $location.url("/home");
        }
    }
})();