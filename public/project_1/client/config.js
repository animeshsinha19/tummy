(function () {
    angular
        .module("ProjectApp")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            //.when("/home", {
            //    templateUrl: "home/home.view.html"
            //})
            .when("/search", {
                templateUrl: "views/search/search.view.html",
                controller: "searchController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkCurrentUser
                }
            })
            .when("/maps", {
                templateUrl: "views/search/maps.view.html",
                controller: "mapsController"
            })
            .when("/results", {
                templateUrl: "views/results/results.view.html",
                controller: "resultsController"
            })
            .when("/results/:place", {
                templateUrl: "views/results/results.view.html",
                controller: "resultsController",
                controllerAs: "model"
            })
            .when("/details/:id", {
                templateUrl: "views/details/details.view.html",
                controller: "detailsController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "loginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "profileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/userinfo", {
                templateUrl: "views/users/userinfo.view.html",
                controller: "userInfoController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "registerController",
                controllerAs: "model"
            })
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "adminController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkAdmin
                }
            })
            .when("/comments/:id", {
                templateUrl: "views/admin/deletecomment.view.html",
                controller: "commentController",
                controllerAs: "model"
            })
            .when("/follow/:id", {
                templateUrl: "views/users/userview.view.html",
                controller: "followController",
                controllerAs: "model"
            })
            //.when("/search/:title", {
            //    templateUrl: "search/search.view.html",
            //    controller: "searchController"
            //})
            //.when("/detail/:imdbID", {
            //    templateUrl: "search/detail.view.html",
            //    controller: "detailController"
            //})
            .otherwise({
                redirectTo: "/search"
            });
    }

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project_1/loggedin')
            .success(
                function (user) {
                    $rootScope.errorMessage = null;
                    // User is Authenticated

                    if (user !== '0' && user.roles.indexOf('admin') != -1) {
                        $rootScope.newUser = user;
                        deferred.resolve();
                    }
                    else {
                        $rootScope.errorMessage = 'You need to log in.';
                        deferred.reject();
                        $location.url('/login');
                    }
                });

        return deferred.promise;
    };


    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project_1/loggedin')
            .success(
                function (user) {
                    $rootScope.errorMessage = null;
                    // User is Authenticated
                    if (user !== '0') {
                        $rootScope.newUser = user;
                        deferred.resolve();
                    }
                    // User is Not Authenticated
                    else {
                        $rootScope.errorMessage = 'You need to log in.';
                        deferred.reject();
                        $location.url('/login');
                    }
                });

        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project_1/loggedin')
            .success(
                function (user) {
                    $rootScope.errorMessage = null;
                    // User is Authenticated
                    if (user !== '0') {
                        $rootScope.newUser = user;
                    }
                    deferred.resolve();
                });

        return deferred.promise;
    };

})();