app.factory('ReportingService', [function () {

    /**
     * This class is for logging notices/warnings/errors, both client and server side
     */
    let ReportingService = {};

    ReportingService.issues = [];

    /**
     *
     * There are two possible sources. These are: Client and Server
     * There are three possible severities. These are: Notice, Warning, Error
     * There are several possible types. These are:
     * Validation
     *
     * @param source
     * @param severity
     * @param type
     * @param issueData
     */
    ReportingService.createIssue = function (source, severity, type, issueData) {
        let issue = {
            source : source,
            severity : severity,
            type : type,
            issueData : issueData
        };

        ReportingService.issues.push(issue);
    };

    ReportingService.getIssues = function () {
        return ReportingService.issues;
    };

    ReportingService.getNumberOfIssues = function () {
        return ReportingService.issues.length;
    };

    ReportingService.getNumberOfIssuesBySource = function (source) {

        let numberOfIssues = 0;

        for (let ii = 0; ii < ReportingService.issues.length; ii++) {
            if(ReportingService.issues[ii].source == source){
                numberOfIssues++;
            }
        }

        return numberOfIssues;

    };

    ReportingService.getNumberOfIssuesBySeverity = function (severity) {

        let numberOfIssues = 0;

        for (let ii = 0; ii < ReportingService.issues.length; ii++) {
            if(ReportingService.issues[ii].severity == severity){
                numberOfIssues++;
            }
        }

        return numberOfIssues;

    };


    ReportingService.clickToOpen = function () {
        ngDialog.open({
            template: '<p>my template</p>',
            plain: true
        });
    };


    return ReportingService;
}]);