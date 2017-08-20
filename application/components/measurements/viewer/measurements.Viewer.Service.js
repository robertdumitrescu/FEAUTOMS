app.factory('MeasurementsViewerService',
    ['$q', 'ReportingService', 'MeasurementsService', 'lodash',
        function ($q, ReportingService, MeasurementsService, lodash) {

            let MeasurementsViewerService = {};

            MeasurementsViewerService.measurements = [];
            MeasurementsViewerService.chart = [];

            MeasurementsViewerService.getMeasurementsValues = function (measurements) {
                let measurementsValues = [];

                for(let x = 0; x < measurements.length; x++){
                    measurementsValues.push(measurements[x].lightIntensity);
                }

                MeasurementsViewerService.chart.values = measurementsValues;
            };

            MeasurementsViewerService.getMeasurementsDates = function (measurements) {
                let measurementsDates = [];

                for(let x = 0; x < measurements.length; x++){
                    measurementsDates.push(measurements[x].createdDateTime.toUTCString());
                }

                MeasurementsViewerService.chart.labels = measurementsDates;
            };

            MeasurementsViewerService.getMeasurements = function () {
                MeasurementsService.get({getTheLastOneFirst: true, from: 0, to: 20})
                    .then(function (measurements) {
                        MeasurementsViewerService.measurements = measurements;
                        MeasurementsViewerService.getMeasurementsValues(measurements.reverse());
                        MeasurementsViewerService.getMeasurementsDates(measurements.reverse());
                    })
            };



            return MeasurementsViewerService;
        }]);
