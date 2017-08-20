app.directive( 'appNavigation', function ( $compile ) {
    return {
        restrict: 'E',
        scope: {
        },
        controller: 'AppNavigationController',
        templateUrl: '/views/app.navigation.View.html'
    };
});