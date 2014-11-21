var AppStateDispatcher  = require('./dispatchers/appstate');

module.exports = {
    declareHeaderLoaded: function() {
        AppStateDispatcher.handleHeaderLoaded();
    },
    declareSplashLoaded: function() {
        AppStateDispatcher.handleSplashLoaded();
    },
    declareSessionDataLoaded: function(sessionData) {
        AppStateDispatcher.handleSessionDataLoaded(sessionData);
    }
};