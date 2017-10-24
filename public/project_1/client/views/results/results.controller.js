(function () {

    angular
        .module("ProjectApp")
        .controller("resultsController", resultsController);

    function resultsController($scope, $routeParams, RestaurantService) {
        var place = $routeParams.place;
        var vm = this;

        function init() {

        }

        init();

        RestaurantService
            .searchByPlace(place)
            .then(function (response) {
                vm.restaurants = response.data.businesses;

            });

    }
})();