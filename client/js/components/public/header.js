/** @jsx React.DOM */
var React           = require('react');

var Util            = require('../../util'),
    Actions         = require('../../actions'),
    AppStateStore   = require('../../stores/appstate');

var Header = React.createClass({
    getInitialState: function() {
        return {
            loaded: false
        };
    },
    componentDidMount: function() {
        // Register for ready event
        AppStateStore.onReady(this.onReady);
        // Wait for the splash image to load
        Util.assets.waitForImages(['/static/img/header-logo.png'], function() {
            Actions.declareHeaderLoaded();
        });
    },
    componentWillUnmount: function() {
        // Unregister for ready event
        AppStateStore.offReady(this.onReady);
    },
    onReady: function() {
        // Show content via animation
        this.setState({
            loaded: true
        });
    },
    render: function() {
        return (
            <header className={this.state.loaded ? '' : 'hidden'}>
                <div id="logo"></div>
            </header>
        );
    }
});

module.exports = Header;