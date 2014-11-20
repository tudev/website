var request = require('superagent');

var AuthService = {
    getSession: function(callback) {
        request
            .get('/session')
            .end(function(err, res) {
                // TODO figure out how this works
                callback();
            });
    },
    login: function(user, pass, callback) {
        request
            .post('/login')
            .send({
                user: user,
                pass: pass
            })
            .end(function(err, res) {
                // TODO figure out how this works
                callback();
            });
    }
};

module.exports = AuthService;