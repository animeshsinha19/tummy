(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            login: login,
            logout: logout,
            register: register,

            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById,

            followUser: followUser,
            unFollowUser: unFollowUser

        };

        return api;

        function register(user) {
            return $http.post("/api/project_1/register", user);
        }

        function logout() {
            return $http.post("/api/project_1/logout");
        }

        function login(user) {
            return $http.post("/api/project_1/login", user);
        }

        function unFollowUser(loggedInUserId, followId) {
            return $http.delete("/api/project_1/user/userloggedInId/" + loggedInUserId + "/followId/" + followId);
        }

        function followUser(loggedInUserId, followId) {
            return $http.get("/api/project_1/user/userloggedInId/" + loggedInUserId + "/followId/" + followId);
        }

        function findUserById(userId) {
            return $http.get("/api/project_1/user/" + userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/project_1/user?username=" + username + "&password=" + password);
        }

        function findAllUsers() {

            return $http.get("/api/project_1/user");
        }

        function createUser(user) {

            return $http.post("/api/project_1/user", user);
        }

        function deleteUserById(userId) {

            return $http.delete("/api/project_1/user/" + userId);
        }

        function updateUser(userId, user) {

            return $http.put("/api/project_1/user/" + userId, user);

        }


    }

})();