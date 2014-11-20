/** @jsx React.DOM */
var React           = require('react'),
    Router          = require('react-router');

var Util            = require('../../util'),
    Actions         = require('../../actions'),
    AppStateStore   = require('../../stores/appstate');

// React-router variables
var Link            = Router.Link;

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
                <div className="middle">
                    <Link to="blog" className="nav">Blog</Link>
                    <Link to="about" className="nav">About</Link>
                    <Link to="register" className="nav">Register</Link>
                    <Link to="/" className="nav" id="logo"/>
                    <Link to="team" className="nav">Team</Link>
                    <Link to="events" className="nav">Events</Link>
                    <Link to="contact" className="nav">Contact</Link>
                </div>
            </header>
        );
    }
});

module.exports = Header;