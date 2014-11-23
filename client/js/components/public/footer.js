/** @jsx React.DOM */
var React           = require('react');

var AppStateStore   = require('../../stores/appstate'),
    Actions         = require('../../actions');

var Footer = React.createClass({
    getInitialState: function() {
        return {
            ready: false
        };
    },
    componentDidMount: function() {
        // Register for events
        AppStateStore.onReady(this.onReady);
    },
    componentWillUnmount: function() {
        // Unregister for events
        AppStateStore.offReady(this.onReady);
    },
    onReady: function() {
        // Show content via animation
        this.setState({
            ready: true
        });
    },
    render: function() {
        return (
            <footer className={this.state.ready ? '' : 'hidden'}>
                <span>Made with <i className="fa fa-heart"></i> in Philadelphia</span>
            </footer>
        );
    }
});

module.exports = Footer;