var mockUsers = require("./users.mockdata.json");

var q = require('q');

module.exports = function (db, mongoose) {

    var userSchema = require("../schemas/user.schema.server.js")(mongoose);
    var userModel = mongoose.model('prjusers', userSchema);


    var api = {
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser,
        updateUserWithLikedRestaurant: updateUserWithLikedRestaurant,
        followAnotherUser: followAnotherUser,
        unFollowAnotherUser: unFollowAnotherUser,

        getLikedRestaurantsForUser: getLikedRestaurantsForUser,
        setRestaurantAsLikedForUser: setRestaurantAsLikedForUser,
        getAllLikedRestaurants: getAllLikedRestaurants,
        deleteLikedRestaurantForUser: deleteLikedRestaurantForUser,
        getAllUsersByRestaurantId: getAllUsersByRestaurantId,
        getLikedRestaurantForUser: getLikedRestaurantForUser,
        createCommentForUser: createCommentForUser,
        getUserComments: getUserComments,
        deleteUserComment: deleteUserComment
    };

    return api;

    function findUserByUsername(username) {
        var deferred = q.defer();

        userModel
            .findOne({
                username: username
            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();

        userModel
            .findOne({
                _id: userId
            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;
    }

    function findUserByCredentials(username, password) {

        var deferred = q.defer();


        userModel
            .findOne({
                username: username,
                password: password
            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc);
                }
            });

        return deferred.promise;


    }


    //var flag = false; //,admin = false;
    //for (var i = 0; i < mockUsers.length; i++) {
    //    if (mockUsers[i].username == username && mockUsers[i].password == password) {
    //        //flag = true;
    //        return mockUsers[i];
    //    }
    //}
    //return null;
    //}

    function findAllUsers() {

        var deferred = q.defer();

        userModel.find(function (err, docs) {
                if (err) {
                    deferred.reject(err);
                }
                else {
                    deferred.resolve(docs);
                }
            }
        );
        return deferred.promise;

    }

    function createUser(user) {

        var deferred = q.defer();

        var newUser = {
            "username": user.username,
            "password": user.password,
            "likes": [],
            "comments": []
        };


        if (user.email) {
            newUser.email = user.email;
        } else {
            newUser.email = "";
        }

        if (user.firstName) {
            newUser.firstName = user.firstName;
        } else {
            newUser.firstName = "";
        }

        if (user.lastName) {
            newUser.lastName = user.lastName;
        } else {
            newUser.lastName = "";
        }

        if (user.likes) {
            newUser.likes = user.likes;
        } else {
            newUser.likes = [];
        }

        if (user.comments) {
            newUser.comments = user.comments;
        } else {
            newUser.comments = [];
        }

        if (user.roles) {
            newUser.roles = user.roles;
        } else {
            newUser.roles = ['normal'];
        }

        //console.log(user.firstName);

        //console.log(newUser);

        userModel.create(newUser, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }

        });
        return deferred.promise;


        //var newUser = {
        //    "_id": (new Date).getTime(),
        //    "firstName": "",
        //    "lastName": "",
        //    "username": user.name,
        //    "password": user.password,
        //    "roles": [],
        //    "email": user.email
        //};
        //mockUsers.push(newUser);
        //
        //return newUser;

    }

    function deleteUserById(userId) {


        var deferred = q.defer();

        userModel.remove({_id: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });

        return deferred.promise;

        //for (var i = 0; i < mockUsers.length; i++) {
        //    if (mockUsers[i]._id == userId) {
        //        mockUsers.splice(i, 1);
        //        return mockUsers;
        //
        //    }
        //}
        //return null;

    }

    function updateUser(userId, user) {

        var deferred = q.defer();

        userModel
            .update({_id: userId},
                {
                    username: user.username,
                    password: user.password,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    roles: user.roles,
                    likes: user.likes,
                    comments: user.comments,
                    follows: user.follows
                },
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {

                        userModel.findOne({_id: userId}, function (err, doc) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(doc);
                            }
                        });

                    }

                });

        return deferred.promise;

        //for (var i = 0; i < mockUsers.length; i++) {
        //    if (mockUsers[i]._id == userId) {
        //        mockUsers[i].username = user.username;
        //        mockUsers[i].password = user.password;
        //        mockUsers[i].email = user.email;
        //        mockUsers[i].firstName = user.firstName;
        //        mockUsers[i].lastName = user.lastName;
        //        return mockUsers[i];
        //
        //    }
        //}
        //
        //return null;
    }

    function updateUserWithLikedRestaurant(userId, restaurant) {
        var deferred = q.defer();

        console.log(restaurant);

        userModel.update(
            {_id: userId},
            {$push: {likes: restaurant}},
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    userModel
                        .findById(
                            userId,
                            function (err, doc) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    //console.log(doc);
                                    deferred.resolve(doc);
                                }
                            });
                }
            });
        return deferred.promise;
    }


    function getLikedRestaurantForUser(userId, restaurantId) {
        var deferred = q.defer();

        userModel
            .findOne({
                _id: userId
            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {


                    var user = doc;
                    var flag = 0;
                    if (user.likes) {
                        for (var i = 0; i < user.likes.length; i++) {
                            if (user.likes[i].yelpID == restaurantId) {
                                flag = 1;
                                break;
                            }
                        }
                    }

                    if (flag == 0) {

                        deferred.reject(doc);
                    } else {
                        deferred.resolve(doc);
                    }
                }
            });

        return deferred.promise;

        //for (var i = 0; i < likedRestaurants.length; i++) {
        //    if (likedRestaurants[i].restaurantId == restaurantId && likedRestaurants[i].userId == userId) {
        //        return likedRestaurants[i];
        //    }
        //}
        //return null;

    }

    function getAllUsersByRestaurantId(restaurantId) {

        var deferred = q.defer();

        userModel
            .find(
                function (err, docs) {
                    if (err) {
                        deferred.reject(err);
                    }
                    else {
                        var allUsers = docs;
                        var users = [];
                        for (var i = 0; i < allUsers.length; i++) {
                            if (allUsers[i].likes) {
                                for (var j = 0; j < allUsers[i].likes.length; j++) {
                                    if (allUsers[i].likes[j].yelpID == restaurantId) {
                                        users.push(allUsers[i]);
                                        break;
                                    }
                                }
                            }

                        }
                        deferred.resolve(users);
                    }
                }
            );
        return deferred.promise;

        //
        //var users = [];
        //userModel
        //    .findAllUsers()
        //    .then(function (response) {
        //        var allUsers = response;
        //
        //        //console.log(allUsers);
        //
        //        for (var i = 0; i < allUsers.length; i++) {
        //            if (allUsers[i].likes) {
        //                for (var j = 0; j < allUsers[i].likes.length; i++) {
        //                    if (allUsers[i].likes[j].yelpID == restaurantId) {
        //                        users.push(allUsers[i]);
        //                        break;
        //                    }
        //                }
        //            }
        //
        //        }
        //
        //        //console.log(users);
        //
        //        return users;
        //
        //    });

        //var restaurants = [];
        //for (var i = 0; i < likedRestaurants.length; i++) {
        //    if (likedRestaurants[i].restaurantId == restaurantId) {
        //        restaurants.push(likedRestaurants[i]);
        //    }
        //}
        //return restaurants;

    }

    function getLikedRestaurantsForUser(userId) {

        var deferred = q.defer();


        userModel
            .findOne({
                _id: userId
            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var user = doc;

                    deferred.resolve(user.likes);

                }
            });

        return deferred.promise;


        //var restaurants = [];
        //for (var i = 0; i < likedRestaurants.length; i++) {
        //    if (likedRestaurants[i].userId == userId) {
        //        restaurants.push(likedRestaurants[i]);
        //    }
        //}
        //return restaurants;
    }

    function setRestaurantAsLikedForUser(userId, newRestaurant) {


        var deferred = q.defer();


        userModel
            .findOne({
                _id: userId
            }, function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var user = doc;

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
                                .update({_id: userId},
                                    {
                                        username: user.username,
                                        password: user.password,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        email: user.email,
                                        roles: user.roles,
                                        likes: user.likes,
                                        comments: user.comments,
                                        follows: user.follows
                                    },
                                    function (err, doc) {
                                        if (err) {
                                            deferred.reject(err);
                                        } else {

                                            userModel.findOne({_id: userId}, function (err, doc) {
                                                if (err) {
                                                    deferred.reject(err);
                                                } else {
                                                    deferred.resolve(doc);
                                                }
                                            });

                                        }

                                    });

                        }

                    } else {
                        user.likes = [newRestaurant];
                        userModel
                            .update({_id: userId},
                                {
                                    username: user.username,
                                    password: user.password,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    roles: user.roles,
                                    likes: user.likes,
                                    comments: user.comments,
                                    follows: user.follows
                                },
                                function (err, doc) {
                                if (err) {
                                    deferred.reject(err);
                                } else {

                                    userModel.findOne({_id: userId}, function (err, doc) {
                                        if (err) {
                                            deferred.reject(err);
                                        } else {
                                            deferred.resolve(doc);
                                        }
                                    });

                                }

                            });

                    }


                }
            });

        return deferred.promise;


        //userModel
        //    .findUserById(userId)
        //    .then(function (user) {
        //
        //        if (user.likes) {
        //            var flag = 0;
        //            for (var i = 0; i < user.likes.length; i++) {
        //                if (user.likes[i].yelpID == newRestaurant.yelpID) {
        //                    flag = 1;
        //                }
        //            }
        //            if (flag == 0) {
        //                user.likes.push(newRestaurant);
        //                userModel
        //                    .updateUser(userId, user)
        //                    .then(function (response) {
        //                        return response;
        //                    });
        //
        //            }
        //
        //        } else {
        //            user.likes = [newRestaurant];
        //            userModel
        //                .updateUser(userId, user)
        //                .then(function (response) {
        //                    return response;
        //                });
        //
        //        }
        //
        //        return user;
        //
        //    });


    }

    function getAllLikedRestaurants() {
        return likedRestaurants;
    }

    function deleteLikedRestaurantForUser(userId, restaurantId) {

        var deferred = q.defer();

        userModel
            .update({_id: userId},
                {$pull: {likes: {yelpID: restaurantId}}},
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        userModel
                            .findById(userId, function (err, doc) {
                                if (err) {
                                    deferred.reject(err);
                                } else {
                                    //console.log(doc);
                                    deferred.resolve(doc);
                                }
                            });
                    }
                });
        return deferred.promise;


        //for (var i = 0; i < likedRestaurants.length; i++) {
        //    if (likedRestaurants[i].userId == userId && likedRestaurants[i].restaurantId == restaurantId) {
        //        likedRestaurants.splice(i, 1);
        //    }
        //}
        //return getLikedRestaurantsForUser(userId);
    }

    function createCommentForUser(userId, restaurantId, comment, restaurantName, address) {
        var deferred = q.defer();


        userModel
            .findOne({_id: userId},
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var user = doc;


                        var restaurantObj = {
                            yelpID: restaurantId,
                            name: restaurantName,
                            address: address
                        };


                        var commentObj = {
                            restaurant: restaurantObj,
                            comments: []
                        };

                        var restaurantFound = 0;

                        var commentID = 0;

                        for (var i = 0; i < user.comments.length; i++) {
                            if (user.comments[i].restaurant.yelpID == restaurantId) {

                                restaurantFound = 1;
                                commentID = user.comments[i]._id;

                                for (var j = 0; j < user.comments[i].comments.length; j++) {
                                    commentObj.comments.push(user.comments[i].comments[j]);
                                }

                                commentObj.comments.push(comment);
                                break;
                            }
                        }

                        if (restaurantFound == 1) {
                            userModel
                                .update({_id: userId},
                                    {$pull: {comments: {_id: commentID}}},
                                    function (err, doc) {
                                        if (err) {
                                            deferred.reject(err);
                                        } else {
                                            userModel.update(
                                                {_id: userId},
                                                {$push: {comments: commentObj}},
                                                function (err, doc) {
                                                    if (err) {
                                                        deferred.reject(err);
                                                    } else {
                                                        userModel
                                                            .find(function (err, doc) {
                                                                if (err) {
                                                                    deferred.reject(err);
                                                                } else {
                                                                    //console.log(doc);
                                                                    deferred.resolve(doc);
                                                                }
                                                            });
                                                    }
                                                });
                                        }
                                    });
                        } else {
                            commentObj.comments.push(comment);

                            userModel.update(
                                {_id: userId},
                                {$push: {comments: commentObj}},
                                function (err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        userModel
                                            .find(function (err, doc) {
                                                if (err) {
                                                    deferred.reject(err);
                                                } else {
                                                    //console.log(doc);
                                                    deferred.resolve(doc);
                                                }
                                            });
                                    }
                                });
                        }


                        //if (user.comments.restaurant.yelpID == restaurantId) {
                        //    for (var i = 0; i < user.comments.comments; i++) {
                        //        commentObj.comments.push(user.comments.comments[i]);
                        //    }
                        //
                        //    commentObj.comments.push(comment);
                        //
                        //    //console.log(user.comments[0].restaurant.yelpID);
                        //
                        //
                        //} else {
                        //
                        //}


                        //user.comments = [commentObj];
                        //
                        //userModel
                        //    .update({_id: userId}, {$set: user}, function (err, doc) {
                        //        if (err) {
                        //            deferred.reject(err);
                        //        } else {
                        //
                        //            userModel.findOne({_id: userId}, function (err, doc) {
                        //                if (err) {
                        //                    deferred.reject(err);
                        //                } else {
                        //                    console.log(doc);
                        //
                        //                    deferred.resolve(doc);
                        //                }
                        //            });
                        //
                        //        }
                        //
                        //    });


                    }
                }
            );


        return deferred.promise;
    }


    function getUserComments() {
        var deferred = q.defer();

        userModel
            .find(function (err, docs) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(docs);
                }
            });

        return deferred.promise;

    }

    function deleteUserComment(restaurantName, userId, comment) {
        var deferred = q.defer();

        userModel
            .findOne({_id: userId},
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var user = doc;


                        //var restaurantObj = {
                        //    yelpID: restaurantId,
                        //    name: restaurantName,
                        //    address: address
                        //};


                        var commentObj = {};

                        var restaurantFound = 0;

                        var commentID = 0;

                        for (var i = 0; i < user.comments.length; i++) {
                            if (user.comments[i].restaurant.name == restaurantName) {

                                restaurantFound = 1;
                                commentID = user.comments[i]._id;

                                var restaurantObj = {
                                    yelpID: user.comments[i].restaurant.yelpID,
                                    name: user.comments[i].restaurant.name,
                                    address: user.comments[i].restaurant.address
                                };


                                commentObj.restaurant = restaurantObj;
                                commentObj.comments = [];


                                for (var j = 0; j < user.comments[i].comments.length; j++) {
                                    if (user.comments[i].comments[j] != comment) {
                                        commentObj.comments.push(user.comments[i].comments[j]);
                                    }

                                }

                                break;
                            }
                        }

                        if (restaurantFound == 1) {
                            userModel
                                .update({_id: userId},
                                    {$pull: {comments: {_id: commentID}}},
                                    function (err, doc) {
                                        if (err) {
                                            deferred.reject(err);
                                        } else {
                                            userModel.update(
                                                {_id: userId},
                                                {$push: {comments: commentObj}},
                                                function (err, doc) {
                                                    if (err) {
                                                        deferred.reject(err);
                                                    } else {
                                                        userModel
                                                            .findOne({_id: userId}, function (err, doc) {
                                                                if (err) {
                                                                    deferred.reject(err);
                                                                } else {
                                                                    var user = doc;
                                                                    var restaurantDeleted = 0;
                                                                    for (var i = 0; i < user.comments.length; i++) {
                                                                        if (user.comments[i].comments.length == 0) {
                                                                            restaurantDeleted = 1;
                                                                            var commentId = user.comments[i]._id;
                                                                            userModel
                                                                                .update({_id: userId},
                                                                                    {$pull: {comments: {_id: commentId}}},
                                                                                    function (err, doc) {
                                                                                        if (err) {
                                                                                            deferred.reject(err);
                                                                                        } else {
                                                                                            userModel
                                                                                                .findOne({_id: userId},
                                                                                                    function (err, doc) {
                                                                                                        if (err) {
                                                                                                            deferred.reject(err);

                                                                                                        } else {
                                                                                                            deferred.resolve(doc);
                                                                                                        }
                                                                                                    });
                                                                                        }
                                                                                    });
                                                                            break;
                                                                        }
                                                                    }

                                                                    if (restaurantDeleted == 0) {
                                                                        deferred.resolve(doc);
                                                                    }

                                                                }
                                                            });
                                                    }
                                                });
                                        }
                                    });
                        }
                    }
                });


        return deferred.promise;
    }

    function followAnotherUser(loggedInUserId, followId) {
        var deferred = q.defer();

        userModel
            .findOne(
                {_id: loggedInUserId},
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var user = doc;

                        if (user.follows) {
                            user.follows.push(followId);
                        } else {
                            user.follows = [followId];
                        }

                        userModel
                            .update({_id: loggedInUserId},
                                {
                                    username: user.username,
                                    password: user.password,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    email: user.email,
                                    roles: user.roles,
                                    likes: user.likes,
                                    comments: user.comments,
                                    follows: user.follows
                                },
                                function (err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        userModel.findOne(
                                            {_id: loggedInUserId},
                                            function (err, doc) {
                                                if (err) {
                                                    deferred.reject(err);
                                                } else {
                                                    //console.log(doc);

                                                    deferred.resolve(doc);
                                                }
                                            });

                                    }

                                });

                    }

                }
            );

        return deferred.promise;
    }

    function unFollowAnotherUser(loggedInUserId, followId) {

        var deferred = q.defer();

        userModel
            .findOne(
                {_id: loggedInUserId},
                function (err, doc) {
                    if (err) {
                        deferred.reject(err);
                    } else {
                        var user = doc;

                        for (var i = 0; i < user.follows.length; i++) {
                            if (user.follows[i] == followId) {

                                user.follows.splice(i, 1);

                                userModel
                                    .update({_id: loggedInUserId},
                                        {
                                            username: user.username,
                                            password: user.password,
                                            firstName: user.firstName,
                                            lastName: user.lastName,
                                            email: user.email,
                                            roles: user.roles,
                                            likes: user.likes,
                                            comments: user.comments,
                                            follows: user.follows
                                        },
                                        function (err, doc) {
                                            if (err) {
                                                deferred.reject(err);
                                            } else {
                                                userModel.findOne(
                                                    {_id: loggedInUserId},
                                                    function (err, doc) {
                                                        if (err) {
                                                            deferred.reject(err);
                                                        } else {
                                                            //console.log(doc);

                                                            deferred.resolve(doc);
                                                        }
                                                    });

                                            }

                                        });


                            }
                        }

                    }
                });

        return deferred.promise;

    }

};