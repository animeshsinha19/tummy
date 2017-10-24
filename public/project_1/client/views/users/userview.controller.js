(function () {
    angular
        .module("ProjectApp")
        .controller("followController", followController);

    function followController($routeParams, UserService, $rootScope, $location) {
        var userId = $routeParams.id;
        var vm = this;

        function init() {

            vm.follow = follow;
            vm.unfollow = unfollow;

            vm.isFollowed = "no";

            initializePageData();

        }

        init();

        function initializePageData() {

            if (userId == $rootScope.newUser._id) {

                $location.url("/userinfo");
                return;
            }

            UserService
                .findUserById(userId)
                .then(function (response) {
                    var user = response.data;

                    vm.username = user.firstName + " " + user.lastName;
                    vm.email = user.email;
                    vm.likes = [];
                    vm.reviews = [];

                    UserService
                        .findUserById($rootScope.newUser._id)
                        .then(function (response) {
                            var loggedinUser = response.data;

                            for (var i = 0; i < loggedinUser.follows.length; i++) {
                                if (userId == loggedinUser.follows[i]) {
                                    vm.isFollowed = "yes";
                                    break;
                                }
                            }


                        });


                    if (user.likes) {
                        if (user.likes.length != 0) {
                            for (var i = 0; i < user.likes.length; i++) {
                                vm.likes.push({
                                    restaurantName: user.likes[i].name,
                                    yelpId: user.likes[i].yelpID
                                });
                            }
                        }
                    }

                    if (user.comments) {
                        if (user.comments.length != 0) {
                            for (var i = 0; i < user.comments.length; i++) {
                                var restaurantName = user.comments[i].restaurant.name;
                                var yelpId = user.comments[i].restaurant.yelpID;
                                //var restaurantComments = [];

                                for (var j = 0; j < user.comments[i].comments.length; j++) {
                                    //restaurantComments.push(user.comments[i].comments[j]);
                                    vm.reviews.push({
                                        restaurantName: restaurantName,
                                        yelpId: yelpId,
                                        comment: user.comments[i].comments[j]
                                    });
                                }
                            }
                        }

                    }


                });

        }

        function follow() {

            var loggedInUserID = $rootScope.newUser._id;

            UserService
                .followUser(loggedInUserID, userId)
                .then(function (response) {
                    $rootScope.newUser = response.data;

                    vm.isFollowed = "yes";
                });

        }

        function unfollow() {
            var loggedInUserID = $rootScope.newUser._id;
            UserService
                .unFollowUser(loggedInUserID, userId)
                .then(function (response) {
                    $rootScope.newUser = response.data;

                    vm.isFollowed = "no";
                });

        }


    }


})();