let serverConnections = [
    {
        "abbreviation" : "BECMS",
        "protocol" : "http",
        "baseUrl" : "46.101.225.81",
        "port" : 3213
    },
    {
        "abbreviation" : "BEAMS",
        "protocol" : "http",
        "baseUrl" : "46.101.225.81",
        "port" : 3205
    },
    {
        "abbreviation" : "BETAXMS", // @TODO This should be replaced when the app is deployed to live
        "protocol" : "http",
        "baseUrl" : "localhost",
        "port" : 3240
    },
    {
        "abbreviation" : "BENMS", // @TODO This should be replaced when the app is deployed to live
        "protocol" : "http",
        "baseUrl" : "localhost",
        "port" : 3248
    }
];


module.exports = serverConnections;

