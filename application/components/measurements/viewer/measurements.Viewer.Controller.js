app.controller('MeasurementsViewerController', ['$scope', '$interval', 'MeasurementsViewerService', function ($scope, $interval, MeasurementsViewerService) {


    /** Service mappings*/
    $scope.MeasurementsViewerService = MeasurementsViewerService;

    $scope.initialize = function () {
        MeasurementsViewerService.getMeasurements();
        let getMeasurementsInterval = $interval(function(){
            MeasurementsViewerService.getMeasurements();
        }, 700);
        $scope.initChart();

    };

    $scope.convertToRelativeLightIntensity = function (lightIntensity) {
        let relativeLightIntensity = 0;

        if(lightIntensity < 50000){
            relativeLightIntensity = (lightIntensity * 100) / 30000;
        } else {
            relativeLightIntensity = 100;
        }

        return relativeLightIntensity;
    };

    $scope.test = function () {
        console.log(MeasurementsViewerService.chart.labels);
        console.log(MeasurementsViewerService.chart.labels.length);
        console.log(MeasurementsViewerService.chart.values);
        console.log(MeasurementsViewerService.chart.values.length);
        $scope.initChart();
    };

    $scope.initChart = function () {

        $scope.labels = ['lala', 'dddd', 'dadada'];
        $scope.series = ['Light'];
        $scope.data = MeasurementsViewerService.chart.values;
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        $scope.options = {
            maintainAspectRatio : false,
            height: 300,
            animation: {
                duration: 200
            },
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    },
                    {
                        id: 'y-axis-2',
                        type: 'linear',
                        display: true,
                        position: 'right'
                    }
                ]
            }
        };

    };


}]);
