var express = require('express');
var router = express.Router();

var GenericHelper = require(global.serverAppRoot + '/generics/generic.Helper.js');

/**
 * @description lapi stands for local API
 * @description Forward route for GET requests
 */

router.get('/lapi' + '/*', function (req, res) {

    GenericHelper.requestForwarder(req, res);

});

/**
 * @description lapi stands for local API
 * @description Forward route for POST requests
 */

router.post('/lapi' + '/*', function (req, res) {

    GenericHelper.requestForwarder(req, res);

});

/**
 * @description lapi stands for local API
 * @description Forward route for PUT requests
 */
router.put('/lapi' + '/*', function (req, res) {

    GenericHelper.requestForwarder(req, res);

});

module.exports = router;
