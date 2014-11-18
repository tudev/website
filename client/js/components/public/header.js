/** @jsx React.DOM */
var React   = require('react');

var Util    = require('../../util');

var Header = React.createClass({
    getInitialState: function() {
        return {
            loaded: false
        };
    },
    componentDidMount: function() {
        var component = this;
        // Wait for the splash image to load
        Util.ui.waitForImages(['/static/img/header-logo.png'], function() {
            // Show content via animation
            component.setState({
                loaded: true
            });
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