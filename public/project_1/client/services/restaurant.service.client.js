(function () {
    angular
        .module("ProjectApp")
        .factory("RestaurantService", restaurantService);

    function restaurantService($http, $q, $rootScope) {

        $rootScope.callback_counter = 0;


        var api = {
            searchByPlace: searchByPlace,
            searchByBusinessId: searchByBusinessId,

            getLikedRestaurantForUser: getLikedRestaurantForUser,
            deleteLikedRestaurantForUser: deleteLikedRestaurantForUser,
            createLikedRestaurantForUser: createLikedRestaurantForUser,
            getLikedRestaurantsForUser: getLikedRestaurantsForUser,
            getAllUsersByRestaurantId: getAllUsersByRestaurantId,
            postCommentByUser: postCommentByUser,
            deleteCommentByUser: deleteCommentByUser,
            getUserComments: getUserComments
            //searchByTerm: searchByTerm,
            //
            //searchByTermAndPlace: searchByTermAndPlace,
            //searchByNumberAndTerm: searchByNumberAndTerm
        };
        return api;

        function deleteCommentByUser(userId, restaurantName, comment) {
            return $http.delete("/api/project_1/restaurant/" + restaurantName + "/user/" + userId + "/comment/" + comment);
        }

        function getUserComments() {
            return $http.get("/api/project_1/restaurant/comments");
        }

        function postCommentByUser(obj) {
            return $http.post("/api/project_1/restaurant/comment", obj);
        }

        function getAllUsersByRestaurantId(restaurantId) {
            return $http.get("/api/project_1/restaurant/" + restaurantId + "/user");
        }

        function getLikedRestaurantsForUser(userId) {
            return $http.get("/api/project_1/user/" + userId + "/restaurants");
        }


        function createLikedRestaurantForUser(userId, newRestaurant) {
            return $http.post("/api/project_1/user/" + userId + "/restaurant", newRestaurant);
        }


        function deleteLikedRestaurantForUser(userId, restaurantId) {
            return $http.delete("/api/project_1/user/" + userId + "/restaurant/" + restaurantId);
        }

        function getLikedRestaurantForUser(userId, restaurantId) {
            return $http.get("/api/project_1/user/" + userId + "/restaurant/" + restaurantId);
        }

        function randomString(length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];

            return result;
        }

        function searchByBusinessId(id) {
            var method = "GET";
            var url = "https://api.yelp.com/v2/business/" + id + "?callback=JSON_CALLBACK";
            var params = {
                callback: 'angular.callbacks._0',
                oauth_consumer_key: 'GTUFbbnSYk51hEdYTTbgbg',
                oauth_token: 'AWBvOu3Gglu1eaVbIwZbuIatXsQAYxad',
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

            };
            var consumerSecret = 'G4WUkT6KRsMuNiXixWgmE32d0p0';
            var tokenSecret = '7PZPsVStdc_YPPLCu6bMzsqNlCA';
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
                encodeSignature: false
            });

            //put signature in params
            params.oauth_signature = signature;

            return $http.jsonp(url, {
                params: params
            });
        }

        function searchByPlace(search_term) {

            var deferred = $q.defer();
            var method = "GET";
            var url = "http://api.yelp.com/v2/search?callback=JSON_CALLBACK";

            var params;

            params = {
                callback: 'angular.callbacks._0',
                location: search_term,
                limit: 20,
                oauth_consumer_key: 'GTUFbbnSYk51hEdYTTbgbg',
                oauth_token: 'AWBvOu3Gglu1eaVbIwZbuIatXsQAYxad',
                oauth_signature_method: "HMAC-SHA1",
                oauth_timestamp: new Date().getTime(),
                oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'),
                term: "food"

            };


            var consumerSecret = 'G4WUkT6KRsMuNiXixWgmE32d0p0';
            var tokenSecret = '7PZPsVStdc_YPPLCu6bMzsqNlCA';
            var signature = oauthSignature.generate(method, url, params, consumerSecret, tokenSecret, {
                encodeSignature: false
            });

            //put signature in params
            params.oauth_signature = signature;

            return $http.jsonp(url, {
                params: params
            });
        }

    }
})();