(function () {
    angular
        .module("ProjectApp")
        .controller("detailsController", detailsController);

    function detailsController($routeParams, RestaurantService, UserService, $rootScope) {
        var yelpId = $routeParams.id;
        var vm = this;

        function init() {
            vm.likebtn = likebtn;
            vm.comment = comment;

            getLikes();
            getLikedGlyph();
            getRestaurantData();
            userComments();
        }

        init();

        function userComments() {


            RestaurantService
                .getUserComments()
                .then(function (response) {

                    vm.allComments = [];

                    var users = response.data;

                    var commentsOnRestaurant = [];

                    for (var i = 0; i < users.length; i++) {

                        var commentObj = users[i].comments;

                        if(commentObj != null) {

                            for (var j = 0; j < commentObj.length; j++) {

                                if (commentObj[j].restaurant.yelpID == yelpId) {

                                    var comment = commentObj[j].comments;

                                    for (var k = 0; k < comment.length; k++) {

                                        var comments = {};

                                        comments.userId = users[i]._id;

                                        comments.firstname = users[i].firstName;

                                        comments.comments = comment[k];

                                        commentsOnRestaurant.push(comments);

                                    }

                                }
                            }
                        }



                    }

                    vm.allComments = commentsOnRestaurant;

                });
        }

        function comment(comments) {

            if (comments == "" || comments == null) {
                vm.error = "Please enter some text";
                return;
            } else {
                vm.error = null;

            }

            vm.comments = "";

            var commentDetails = {
                comments: comments,
                yelpId: yelpId,
                restaurantName: vm.restaurantName,
                address: vm.address,
                userId: $rootScope.newUser._id
            };

            //console.log(commentDetails);

            RestaurantService
                .postCommentByUser(commentDetails)
                .then(function (response) {
                    vm.allComments = [];

                    var users = response.data;

                    var commentsOnRestaurant = [];

                    for (var i = 0; i < users.length; i++) {

                        var commentObj = users[i].comments;

                        for (var j = 0; j < commentObj.length; j++) {

                            if (commentObj[j].restaurant.yelpID == yelpId) {

                                var comment = commentObj[j].comments;

                                for (var k = 0; k < comment.length; k++) {

                                    var comments = {};

                                    comments.userId = users[i]._id;

                                    comments.firstname = users[i].firstName;

                                    comments.comments = comment[k];

                                    commentsOnRestaurant.push(comments);

                                }

                            }
                        }

                    }

                    vm.allComments = commentsOnRestaurant;

                });


        }


        function getRestaurantData() {
            RestaurantService
                .searchByBusinessId(yelpId)
                .then(function (response) {

                    vm.locationCoords = response.data.location.coordinate;
                    vm.data = response.data;
                    vm.restaurantName = vm.data.name;
                    vm.address = response.data.location.display_address;

                });
        }

        function getLikedGlyph() {
            if ($rootScope.newUser) {
                RestaurantService
                    .getLikedRestaurantForUser($rootScope.newUser._id, yelpId)
                    .then(function (response) {
                        //console.log(response.data);

                        if (response.data) {
                            vm.liked = "yes";
                        } else {
                            vm.liked = "no";
                        }
                    });

            }
        }


        function likebtn() {
            var newRestaurant = {
                yelpID: yelpId,
                name: vm.restaurantName,
                address: vm.address
            };

            //console.log(newRestaurant);

            if (vm.liked == "yes") {
                vm.liked = "no";
                RestaurantService
                    .deleteLikedRestaurantForUser($rootScope.newUser._id, yelpId);


            } else {
                vm.liked = "yes";
                RestaurantService
                    .createLikedRestaurantForUser($rootScope.newUser._id, newRestaurant);
            }

            getLikes();
        }


        function getLikes() {
            RestaurantService
                .getAllUsersByRestaurantId(yelpId)
                .then(function (response) {

                    vm.users = [];

                    var users = response.data;

                    var firstnames = [];
                    var userIds = [];
                    for (var i = 0; i < users.length; i++) {
                        vm.users.push({
                            firstName: users[i].firstName,
                            userId: users[i]._id
                        });

                    }


                });
        }


    }
})();