(function (){
    'use strict';
    angular
        .module("ProjectApp")
        .controller("MainController",MainController);



    function MainController($scope,$location) {
        $scope.$location = $location;

    }
})();