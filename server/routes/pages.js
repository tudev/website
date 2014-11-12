var path = require('path');

exports.route = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'pages', 'index.html'));
    });
};