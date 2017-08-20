var express = require('express');
var router = express.Router();
var path = require('path');

var GenericHelper = require(global.serverAppRoot + '/generics/generic.Helper.js');

/**
 * @description lapi stands for local API
 * @description Forward route for GET requests
 */

router.get('/config', function(req, res) {
    res.send(global.config);
});

/* GET home page. */
router.get('*', function(req, res) {
 res.sendFile(global.publicAppRoot + '/views/app.index.html');
 });


module.exports = router;