var assign              = require('object-assign'),
    EventEmitter        = require('events').EventEmitter;

var AppStateDispatcher  = require('../dispatchers/appstate');

var EVENT_READY     = 'appstate_event_ready';

var appState = {
    headerLoaded: false,
    sessionDataLoaded: false,
    sessionData: {},
    splashLoaded: false
};

var AppStateStore = assign({}, EventEmitter.prototype, {
    // State getters
    isReady: function() {
        return appState.headerLoaded && appState.sessionDataLoaded;
    },
    splashHasLoaded: function() {
        return appState.splashLoaded;
    },
    isLoggedIn: function() {
        if (!appState.sessionData) return false;
        else return (appState.sessionData.id || appState.sessionData.id === 0) && appState.sessionData.userName;
    },
    // Ready event functions
    emitReady: function() {
        this.emit(EVENT_READY);
    },
    onReady: function(callback) {
        this.on(EVENT_READY, callback);
    },
    offReady: function(callback) {
        this.removeListener(EVENT_READY, callback);
    }
});

// Register for app state actions
AppStateDispatcher.register(function(action) {
    switch(action.type) {
        case AppStateDispatcher.events.HEADER_LOADED:
            appState.headerLoaded = true;
            if (appState.sessionDataLoaded) {
                AppStateStore.emitReady();
            }
            return true;
        case AppStateDispatcher.events.SESSION_DATA_LOADED:
            appState.sessionData = action.sessionData;
            appState.sessionDataLoaded = true;
            if (appState.headerLoaded) {
                AppStateStore.emitReady();
            }
            return true;
        case AppStateDispatcher.events.SPLASH_LOADED:
            appState.splashLoaded = true;
            return true;
    }

    return false;
});

module.exports = AppStateStore;