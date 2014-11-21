var AppStateDispatcher  = require('./dispatchers/appstate'),
    UIStateDispatcher   = require('./dispatchers/uistate');

module.exports = {
    // App State Actions
    declareHeaderLoaded: function() {
        AppStateDispatcher.handleHeaderLoaded();
    },
    declareSplashLoaded: function() {
        AppStateDispatcher.handleSplashLoaded();
    },
    declareSessionDataLoaded: function(sessionData) {
        AppStateDispatcher.handleSessionDataLoaded(sessionData);
    },
    // UI Events
    showSessionPanel: function() {
        UIStateDispatcher.handleSessionPanelShown();
    },
    hideSessionPanel: function() {
        UIStateDispatcher.handleSessionPanelHidden();
    }
};