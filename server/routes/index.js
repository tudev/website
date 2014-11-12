var fs      = require('fs'),
    path    = require('path'),
    async   = require('async');

var log     = require('../log');

function route404(app) {
    log.debug('Loading 404 route');
    app.get('/*', function(req, res) {
        res.status(404).sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'pages', '404.html'));
    });
}

exports.route = function(app, callback) {
    fs.readdir(__dirname, function(err, files) {
        if (err) callback(err);
        else {
            async.each(files, function(file, callback) {
                try {
                    if (file !== 'index.js') {
                        var routeModule = require(path.join(__dirname, file));
                        if (routeModule && routeModule.route) {
                            log.debug('Loading routes from ' + file);
                            routeModule.route(app);
                        }
                    }
                    callback();
                } catch (err) {
                    callback(err);
                }
            }, function(err) {
                if (err) callback(err);
                else {
                    // 404 route must be added _after_ all the others
                    route404(app);
                    // All routing now complete
                    callback();
                }
            });
        }
    });
};