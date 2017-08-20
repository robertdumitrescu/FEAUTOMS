"use strict";
/**
 * @class GenericHelper
 * @static
 */

class GenericHelper {


    /**
     *
     * @param {Object} targetServerConnection
     */
    static buildTargetUrl(targetServerConnection) {
        return targetServerConnection.protocol +
            "://" +
            targetServerConnection.baseUrl +
            ":" +
            targetServerConnection.port;
    }

    /**
     *
     * @param projectAbbreviation
     * @returns {string}
     */
    static getProjectBaseUrlByAbbreviation(projectAbbreviation) {

        let projectBaseUrl = "";

        /** tsci - stands for Target Server Connections Iterator */
        for (let tsci = 0; tsci < global.target.serverConnections.length; tsci++) {
            if (global.target.serverConnections[tsci].abbreviation == projectAbbreviation) {
                projectBaseUrl = GenericHelper.buildTargetUrl(global.target.serverConnections[tsci]);
            }
        }

        console.log(projectBaseUrl);
        return projectBaseUrl;
    }


    static requestForwarder(req, res) {
        GenericHelper.methodTriggerLog(GenericHelper.name + "." + GenericHelper.requestForwarder.name);
        let processedUri = req.url.replace('/lapi', '');

        req.headers["x-no-compression"] = "no-compression";
        let targetAppAbbreviation = req.headers["x-target-app"];

        console.log("AAAA");
        console.log(targetAppAbbreviation);

        let baseUrl = GenericHelper.getProjectBaseUrlByAbbreviation(targetAppAbbreviation);

        let options = {
            method: req.method,
            url: baseUrl + processedUri,
            headers: req.headers
        };

        console.log(options.url);

        if (req.method == "POST" || req.method == "PUT") {
            options.body = req.body;
            options.json = true;
        }

        console.log(options);

        let requestCallback = function (error, response) {
            if (error) {

                console.log(error);

            } else {

                if (typeof response.statusCode == "undefined") {
                    response.statusCode = 500;
                }
                // console.log(response);
                // console.log(response.body);
                res.status(response.statusCode).send(response.body);

            }
        };

        global.request(options, requestCallback);

    };


    static methodTriggerLog(method) {

        if (global.config.methodTriggerLoggingOn) {
            console.log(method);
        }

    }

}

module.exports = GenericHelper;