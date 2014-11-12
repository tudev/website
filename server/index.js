var express = require('express'),
    // General purpose imports
    path    = require('path'),
    async   = require('async');

var routes  = require('./routes'),
    util    = require('./util'),
    log     = require('./log');

module.exports = function(done) {
    // Create the server instance
    var app = express();
    // Middleware
    app.use('/static', express.static(path.join(__dirname, '..', 'client', 'dist')));
    // Perform setup
    async.series([
        function(callback) {
            // Perform server routing
            routes.route(app, callback);
        },
        function(callback) {
            // Start servicing the requests
            app.listen(util.env.serverPort, callback);
        }
    ], function(err) {
        if (err) {
            log.error('Server could not start', err);
            if (done) done(err);
        } else {
            log.info('Server is listening on ' + util.env.serverPort);
            if (done) done();
        }
    });
};