(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .controller("userInfoController", userInfoController);

    function userInfoController(RestaurantService, $rootScope, UserService) {

        var vm = this;

        function init() {

            vm.restaurants = [];

            var newUser = $rootScope.newUser;
            //console.log(newUser);

            vm.username = newUser.username;
            vm.password = newUser.password;
            vm.email = newUser.email;
            vm.firstname = newUser.firstName;
            vm.lastname = newUser.lastName;

            //vm.userNameAndIds = [];
            if (vm.userNameAndIds) {
                delete vm.userNameAndIds;
            }

            if (newUser.follows) {
                if (newUser.follows.length != 0)
                    vm.userNameAndIds = getFollowedUser(newUser.follows);
            }


            RestaurantService
                .getLikedRestaurantsForUser($rootScope.newUser._id)
                .then(function (response) {
                    getRestaurantDetails(response.data);
                });

        }

        init();

        function getFollowedUser(followIds) {
            var userIdAndNames = [];

            for (var i = 0; i < followIds.length; i++) {
                UserService
                    .findUserById(followIds[i])
                    .then(function (response) {

                        var user = response.data;

                        if (user.firstName != "") {
                            userIdAndNames.push({
                                userId: user._id,
                                username: user.firstName + " " + user.lastName
                            });

                        } else {
                            userIdAndNames.push({
                                userId: user._id,
                                username: user.username
                            });
                        }

                    });
            }

            return userIdAndNames;
        }

        function getRestaurantDetails(restaurants) {

            if (restaurants) {
                for (var i = 0; i < restaurants.length; i++) {
                    vm.restaurants.push({
                        restaurantId: restaurants[i].yelpID,
                        restaurantName: restaurants[i].name
                    });

                }
            }

        }


    }
})();