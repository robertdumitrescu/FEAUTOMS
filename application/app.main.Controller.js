app.controller("MainController", ['$rootScope', '$scope', '$location', '$http', 'ReportingService', function($rootScope, $scope, $location, $http, ReportingService) {

    /** $rootScope objects init */

    $scope.ReportingService = ReportingService;

    $rootScope.internalData = {};
    $rootScope.roleBuilder = {};

    $rootScope.rootScopeTest = function(){
        // console.log($rootScope);
    };

    $scope.getConfig = function () {
        $http.get("/config")
            .then(function(response) {
                $rootScope.internalConfig = response.data;
                // console.log($rootScope.internalConfig);
            }, function(response) {
                // console.log("Config not loaded");
            });
    };

    $rootScope.goToUrl = function (targetRoute) {

        $location.path(targetRoute);

    };

}]);