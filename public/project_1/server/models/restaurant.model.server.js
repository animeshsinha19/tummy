var likedRestaurants = [];

var q = require('q');

module.exports = function (db, mongoose, userModel) {

    var api = {
        getLikedRestaurantsForUser: getLikedRestaurantsForUser,
        setRestaurantAsLikedForUser: setRestaurantAsLikedForUser,
        getAllLikedRestaurants: getAllLikedRestaurants,
        deleteLikedRestaurant: deleteLikedRestaurant,
        getAllUsersByRestaurantId: getAllUsersByRestaurantId,
        getLikedRestaurantForUser: getLikedRestaurantForUser

    };

    return api;

    function getLikedRestaurantForUser(userId, restaurantId) {
        for (var i = 0; i < likedRestaurants.length; i++) {
            if (likedRestaurants[i].restaurantId == restaurantId && likedRestaurants[i].userId == userId) {
                return likedRestaurants[i];
            }
        }
        return null;

    }

    function getAllUsersByRestaurantId(restaurantId) {
        var users = [];
        userModel
            .findAllUsers()
            .then(function (response) {
                var allUsers = response;

                //console.log(allUsers);

                for (var i = 0; i < allUsers.length; i++) {
                    if (allUsers[i].likes) {
                        for (var j = 0; j < allUsers[i].likes.length; i++) {
                            if(allUsers[i].likes[j].yelpID == restaurantId) {
                                users.push(allUsers[i]);
                                break;
                            }
                        }
                    }

                }

                //console.log(users);

                return users;

            });

        //var restaurants = [];
        //for (var i = 0; i < likedRestaurants.length; i++) {
        //    if (likedRestaurants[i].restaurantId == restaurantId) {
        //        restaurants.push(likedRestaurants[i]);
        //    }
        //}
        //return restaurants;

    }

    function getLikedRestaurantsForUser(userId) {
        var restaurants = [];
        for (var i = 0; i < likedRestaurants.length; i++) {
            if (likedRestaurants[i].userId == userId) {
                restaurants.push(likedRestaurants[i]);
            }
        }
        return restaurants;
    }

    function setRestaurantAsLikedForUser(userId, newRestaurant) {

        userModel
            .findUserById(userId)
            .then(function (user) {

                if (user.likes) {
                    var flag = 0;
                    for (var i = 0; i < user.likes.length; i++) {
                        if (user.likes[i].yelpID == newRestaurant.yelpID) {
                            flag = 1;
                        }
                    }
                    if (flag == 0) {
                        user.likes.push(newRestaurant);
                        userModel
                            .updateUser(userId, user)
                            .then(function (response) {
                                return response;
                            });

                    }

                } else {
                    user.likes = [newRestaurant];
                    userModel
                        .updateUser(userId, user)
                        .then(function (response) {
                            return response;
                        });

                }

                return user;

            });


    }

    function getAllLikedRestaurants() {
        return likedRestaurants;
    }

    function deleteLikedRestaurant(userId, restaurantId) {
        for (var i = 0; i < likedRestaurants.length; i++) {
            if (likedRestaurants[i].userId == userId && likedRestaurants[i].restaurantId == restaurantId) {
                likedRestaurants.splice(i, 1);
            }
        }
        return getLikedRestaurantsForUser(userId);
    }

};