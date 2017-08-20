app.directive('headerComponent', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            applicationTitle : '=',
            issues : '=',
            numberOfIssues : '=',
            numberOfServerIssues : '=',
            numberOfClientIssues : '=',
            numberOfNotices : '=',
            numberOfWarnings : '=',
            numberOfErrors : '='
        },
        controller: ['$scope', 'ngDialog', function headerComponentController($scope, ngDialog) {

            $scope.clickToOpen = function() {
                // console.log($scope.issues);
                ngDialog.open({
                    template: '/views/shared/components/header/header.ReportingModal.Template.html',
                    scope: $scope
                });
            };
        }],
        templateUrl: '/views/shared/components/header/header.Template.html'
    };
});