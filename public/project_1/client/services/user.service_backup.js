(function () {
    'use strict';
    angular
        .module("ProjectApp")
        .factory("UserService", UserService);

    function UserService() {

        var users =
            [
                {
                    "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                    "username": "alice", "password": "alice", "roles": ["normal"]
                },
                {
                    "_id": 234, "firstName": "Bob", "lastName": "Hope",
                    "username": "bob", "password": "bob", "roles": ["admin"]
                },
                {
                    "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                    "username": "charlie", "password": "charlie", "roles": ["normal"]
                },
                {
                    "_id": 456, "firstName": "Dan", "lastName": "Craig",
                    "username": "dan", "password": "dan", "roles": ["normal", "admin"]
                },
                {
                    "_id": 567, "firstName": "Edward", "lastName": "Norton",
                    "username": "ed", "password": "ed", "roles": ["normal"]
                }
            ];


        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };

        return api;


        function findUserByCredentials(username, password, callback) {
            var flag = false; //,admin = false;
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username && users[i].password == password) {
                    flag = true;
                    if(users[i].roles.indexOf('admin')>=0)
                        callback(users[i],users);
                    else
                        callback(users[i],"NA");

                    break;
                }
            }
            if (!flag) {
                callback(null,null);
            }
        }

        function findAllUsers(callback) {

            callback(users);
        }

        function createUser(user, callback) {
            var newUser = {
                "_id": (new Date).getTime(),
                "firstName": "",
                "lastName": "",
                "username": user.name,
                "password": user.password,
                "roles": [],
                "email": user.email
            };
            users.push(newUser);

            callback(newUser);

        }

        function deleteUserById(userId, callback) {

            for (var i = 0; i < users.length; i++) {
                if (users[i]._id == userId) {
                    users.splice(i, 1);
                    callback(users);
                    break;
                }
            }

        }

        function updateUser(userId, user, callback) {

            for(var i=0;i<users.length;i++) {
                if(users[i]._id == userId) {
                    users[i].username = user.username;
                    users[i].password = user.password;
                    users[i].email = user.email;
                    users[i].firstName = user.firstName;
                    users[i].lastName = user.lastName;
                    callback(users[i]);
                    break;
                }
            }




        }


    }
})();