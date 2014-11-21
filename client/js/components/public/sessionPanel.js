/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions'),
    UIStateStore    = require('../../stores/uistate'),
    AppStateStore   = require('../../stores/appstate');

// React-router variables
var Link            = Router.Link;

var SessionPanel = React.createClass({
    getInitialState: function() {
        return {
            visible: false,
            concealed: true
        };
    },
    componentDidMount: function() {
        // Register for events
        AppStateStore.onReady(this.onReady);
        UIStateStore.onSessionPanelVisibilityChanged(this.onVisibilityChanged);
        // Wait for the splash image to load
        Util.assets.waitForImages(['/static/img/header-logo.png'], function() {
            Actions.declareHeaderLoaded();
        });
    },
    componentWillUnmount: function() {
        // Unregister for events
        AppStateStore.offReady(this.onReady);
        UIStateStore.offSessionPanelVisibilityChanged(this.onVisibilityChanged);
    },
    onReady: function() {
        var component = this;
        setTimeout(function() {
            // Wait till the header has animated
            component.setState({
                concealed: false
            });
            // Stop listening for ready
            AppStateStore.offReady(this.onReady);
        }, 500);
    },
    onVisibilityChanged: function(visible) {
        // Show content via animation
        this.setState({
            visible: visible
        });
        console.log('session panel is now', visible);
    },
    onMouseLeave: function() {
        Actions.hideSessionPanel();
    },
    render: function() {
        var sessionPanelClasses = [];
        if (this.state.concealed) sessionPanelClasses.push('concealed');
        if (this.state.visible) sessionPanelClasses.push('visible');

        return (
            <div id="session-panel" className={sessionPanelClasses.join(' ')} onMouseLeave={this.onMouseLeave}>
            </div>
        );
    }
});

module.exports = SessionPanel;