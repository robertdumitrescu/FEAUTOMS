app.factory('MeasurementsService', ['$q', '$http', 'ReportingService', function ($q, $http, ReportingService) {

    let measurementsApiUrl = "/lapi/api/measurements";
    let measurementsTargetApp = "BEAUTOMS";

    let MeasurementsService = {};

    MeasurementsService.get = function (query) {
        let deferred = $q.defer();
        $http({
            url: measurementsApiUrl,
            method: "GET",
            params: query,
            headers: {
                "x-target-app": measurementsTargetApp
            }
        })
            .then(function successCallback(response) {

                let measurementGetApiModels = response.data.data;
                let measurementDomainModels = MeasurementDomainModel.fromGetApiModels(measurementGetApiModels);

                deferred.resolve(measurementDomainModels);
            })
            .catch(function errorCallback(rejectResponse) {
                ReportingService.createIssue(
                    "Server",
                    "Error",
                    rejectResponse.type,
                    rejectResponse.data
                );
                deferred.reject(rejectResponse);
            });

        return deferred.promise;
    };

    return MeasurementsService;
}]);