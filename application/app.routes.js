app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/measurements/viewer', {
            templateUrl: '/views/components/measurements/viewer/measurements.Viewer.View.html',
            controller: 'MeasurementsViewerController'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
}]);