(function () {
    angular
        .module("ProjectApp")
        .controller("commentController", commentController);

    function commentController($routeParams, UserService, RestaurantService) {
        var userId = $routeParams.id;
        var vm = this;

        function init() {
            vm.deleteComment = deleteComment;

            getUserDetails(userId);

        }

        init();

        function deleteComment(index) {
            var restaurantComment = vm.allComments[index];


            RestaurantService
                .deleteCommentByUser(userId,restaurantComment.restaurantName,restaurantComment.comment)
                .then(function(response) {

                    vm.allComments = [];

                    var user = response.data;

                    //console.log(user.comments);

                    var allComments = [];

                    for (var i = 0; i < user.comments.length; i++) {
                        for (var j = 0; j < user.comments[i].comments.length; j++) {
                            var restaurantsAndComments = {};

                            restaurantsAndComments.restaurantName = user.comments[i].restaurant.name;
                            restaurantsAndComments.comment = user.comments[i].comments[j];

                            allComments.push(restaurantsAndComments);
                        }
                    }

                    //console.log(allComments);

                    if (allComments.length > 0) {
                        vm.allComments = allComments;
                    }


                });


        }

        function getUserDetails(userId) {
            UserService
                .findUserById(userId)
                .then(function (response) {

                    vm.allComments = [];


                    var user = response.data;

                    var allComments = [];

                    vm.firstName = user.firstName;

                    for (var i = 0; i < user.comments.length; i++) {
                        for (var j = 0; j < user.comments[i].comments.length; j++) {
                            var restaurantsAndComments = {};

                            restaurantsAndComments.restaurantName = user.comments[i].restaurant.name;
                            restaurantsAndComments.comment = user.comments[i].comments[j];

                            allComments.push(restaurantsAndComments);
                        }
                    }

                    //console.log(allComments);

                    if (allComments.length > 0) {
                        vm.allComments = allComments;
                    }

                });
        }

    }
})();