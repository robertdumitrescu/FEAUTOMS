/**
 * Express Framework
 * Express Framework it's a micro framework used to develop and integrate
 * easily Node.Js applications
 * @module express
 * @link "https://github.com/strongloop/express/wiki" | Express Wiki
 */
var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var compression = require('compression');




process.argv.forEach(function (val, index, array) {
    if(val.indexOf("env") === 0){
        let argumentArray = val.split("=");
        global.environmentName = argumentArray[1];
    }
});

if(typeof global.environmentName === "undefined" || global.environmentName === "") {
    global.environmentName = "dev";
}

process.argv.forEach(function (val, index, array) {
    if(val.indexOf("target") === 0){
        let argumentArray = val.split("=");
        global.targetName = argumentArray[1];
    }
});

if(typeof global.targetName === "undefined" || global.targetName === "") {
    global.targetName = "dev";
}

console.log(global.targetName);

global.config = require('./config/' + global.environmentName + '/config.js');
global.target = require('./targets/' + global.targetName + '/target.js');
// console.log(global.config);
console.log(global.target);
global.appRoot = path.resolve(__dirname) + "/";
global.serverAppRoot = path.resolve(__dirname) + "/server";
global.publicAppRoot = path.resolve(__dirname) + "/public";
global.Q = require('q');

/**
 * Request
 */

global.request = require('request');
console.log(global.config.projectData.proxy);
global.request.defaults({'proxy': global.config.projectData.proxy});

var apiController = require(global.serverAppRoot + '/controllers/api.Controller.js');
var StaticsController = require(global.serverAppRoot + '/controllers/statics.Controller.js');

/** Express application instantiation */
var app = express();

/** Morgan config - Request logger */
app.use(morgan('dev'));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));

/** This is to let Node.js take json data from POST request */
app.use(bodyParser.json());

app.use(cookieParser());
app.use(compression());

app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('views', global.serverAppRoot + "/views");
app.set('view engine', 'ejs');


app.use('/', apiController);
app.use('/', StaticsController);

let server = app.listen(global.config.projectData.listeningPort, function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log('====================> [' + new Date() + '] Starting ' + global.config.projectData.abbreviation);
    console.log('Full name : ' + global.config.projectData.name);
    console.log('App code : ' + global.config.projectData.code);
    console.log('Environment : ' + global.environmentName);
    console.log('Target : ' + global.targetName);
    console.log('Listening at ' + 'http://' + host + ':' + port);
    console.log('====================> Started successfully');

});