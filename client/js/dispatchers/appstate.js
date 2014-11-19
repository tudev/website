var assign      = require('object-assign'),
    Dispatcher  = require('flux').Dispatcher;

var AppStateDispatcher = assign(new Dispatcher(), {
    events: {
        HEADER_LOADED: 1,
        SESSION_DATA_LOADED: 2
    },
    handleHeaderLoaded: function() {
        this.dispatch({
            type: this.events.HEADER_LOADED
        });
    },
    handleSessionDataLoaded: function(data) {
        this.dispatch({
            type: this.events.SESSION_DATA_LOADED,
            data: data
        });
    }
});

module.exports = AppStateDispatcher;