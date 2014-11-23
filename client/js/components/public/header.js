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
            loaded: false,
            fixed: false
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
        }, function() {
            // Register the header as fixed after the animaiton finishes
            var component = this;
            setTimeout(function() {
                component.setState({
                    fixed: true
                });
            }, 500);
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
                    <Link to="events" className="nav">Events</Link>
                    <Link to="team" className="nav">Team</Link>
                    <Link to="contact" className="nav">Contact</Link>
                </div>
                <div className="session-panel">
                    <div id="session-panel-logged-in" style={{ display: AppStateStore.isLoggedIn() ? 'block' : 'none' }}>
                        <span>Logged In</span>
                    </div>
                    <div id="session-panel-not-logged-in" style={{ display: AppStateStore.isLoggedIn() ? 'none' : 'block' }}>
                        <Link to="login" className='login-button'>Log In</Link>
                    </div>
                </div>
            </header>
        );
    }
});

module.exports = Header;